-- Quesries

-- Sign up
INSERT INTO users (name, email, password, birth_date)
	VALUES (
			@name,
            @email,
            @password,
            @birth_date
	);

-- Change password
UPDATE USERS
	SET password = @password
    WHERE user_id = @user_id;

-- Change bio
UPDATE users
	SET user_bio = @bio
    WHERE user_id = @user_id;

-- Login
SELECT *
	FROM users
    WHERE name = @name AND password = @password;

-- DEVELOPER QUERIES
-- Display tracks
SELECT track_id, users.name, subjects.name, duration, difficulty, creation_date
	FROM track, users, subjects
    WHERE track.subject_id = subjects.subject_id AND writer_id = user_id
    ORDER BY creation_date DESC;
-- Display featured tracks
SELECT track.track_id, users.name, subjects.name, duration, difficulty, creation_date
	FROM track, users, subjects, is_featured
    WHERE track.track_id IN (SELECT track_id FROM is_featured)
		AND track.subject_id = subjects.subject_id
        AND writer_id = user_id
    ORDER BY creation_date DESC;

-- Search subjects
SELECT track_id, users.name, subjects.name, duration, difficulty, creation_date
	FROM track, users, subjects
    WHERE track.subject_id = subjects.subject_id 
		AND subjects.name = @subj
        AND writer_id = user_id
    ORDER BY creation_date DESC;

-- Display/update interview requests
SELECT request_id, company.name, status, sent, deadline
	FROM interview_request, represents, company
    WHERE receiver_id = @user_id
		AND deadline > CURRENT_TIMESTAMP
		AND sender_id = representative_id
		AND represents.company_id = company.company_id;
SELECT request_id, sender_id, company.name, company.bio, status, job_desc, sent, deadline
	FROM interview_request, represents, company
    WHERE request_id = @req_id
		AND sender_id = representative_id
		AND represents.company_id = company.company_id;
UPDATE interview_request
	SET status = "accepted"
	WHERE request_id = @req_id;
UPDATE interview_request
	SET status = "declined"
	WHERE request_id = @req_id;

-- Track: display questions, submit answers
-- Get questions in selected track
SELECT question_id
	FROM consists_of
	WHERE track_id = @track_id;
-- Display question
SELECT title, question, input AS test_input, output AS test_output
	FROM question, test_case
    WHERE question.question_id = @q_id
		AND test_case.question_id = @q_id
	ORDER BY case_id;
-- Display test_cases
SELECT case_id, input AS test_input, output AS test_output
	FROM test_case
    WHERE question_id = @q_id
	ORDER BY case_id;
-- Submit code
INSERT INTO submitted_code (language, code)
	VALUES ( @lang, @code);
-- Get id of submission
SELECT LAST_INSERT_ID();

-- Create participation
INSERT INTO participation (track_id, developer_id, question_id, submission_id, start_time, end_time)
	VALUES (@track_id, @user_id, @question_id, @submission_id, @start_time, @end_time);

-- Display report
SELECT score, start_time, finish_time
	FROM report
    WHERE user_id = @user_id AND track_id = @track_id;

-- Display submitted code for track
SELECT question_id, participation.submission_id, language, code, start_time, finish_time
	FROM participation, submitted_code
    WHERE track_id = @track_id
		AND developer_id = @user_id
        AND participation.submission_id = submitted_code.submission_id;

-- Display leaderboard
SELECT report.user_id, users.name, score
	FROM report LEFT JOIN users
		ON report.user_id = users.user_id
	WHERE track_id = @track_id
    ORDER BY score DESC;

-- Display completed tracks
SELECT report.track_id, track.name, subjects.name, difficulty, finish_time AS completion_time, score
	FROM report, subjects, track
    WHERE user_id = @user_id
		AND	report.track_id = track.track_id
		AND track.subject_id = subjects.subject_id;

-- Create question
INSERT INTO question (writer_id, title, question)
	VALUES ( @user_id, @title, @question);
-- Get question_id to @q_id
SELECT LAST_INSERT_ID();

-- Assign subject
INSERT INTO has_subject (question_id, subject_id)
	VALUES (@q_id,
			(SELECT subject_id
				FROM subjects
                WHERE name = @subj)
	);
-- Create test cases
INSERT INTO test_case (question_id, input, output)
	VALUES (@q_id, @input, @output);


-- ADMIN QUERIES

-- Display questions
SELECT question_id, title, subjects.name, difficulty, status
	FROM question, subjects, 
		(SELECT question_id, MIN(subject_id) AS subject_id
			FROM has_subject
            GROUP BY question_id) S
	WHERE S.question_id = question.question_id
		AND subjects.subject_id = S.subject_id;

-- Display waiting questions
SELECT question_id, title, subjects.name, difficulty, status
	FROM question, subjects, 
		(SELECT question_id, MIN(subject_id) AS subject_id
			FROM has_subject
            GROUP BY question_id) S
	WHERE status = "waiting"
		AND S.question_id = question.question_id
		AND subjects.subject_id = S.subject_id;

-- Display questions by subject
SELECT question_id, title, @subject_name, difficulty, status
	FROM question, subjects
	WHERE question_id IN (SELECT question_id
							FROM has_subject, subjects
                            WHERE subjects.name = @subject_name
								AND has_subject.subject_id = subjects.subject_id)
	ORDER BY creation_date;

-- Create new subject
INSERT INTO subjects (name, description)
	VALUES (@subj_name, @subj_desc);

-- Create track
INSERT INTO track (writer_id, subject_id, name, difficulty, duration)
	VALUES (1,
			(SELECT subject_id
				FROM subjects
                WHERE subjects.name = "Java"),
			@track_name,
            @difficulty,
            @duration);

-- Get track id
SELECT LAST_INSERT_ID();

-- Assess question
UPDATE question
	SET assessor_id = @user_id,
		status = @stat
	WHERE question_id = @q_id;
    
-- Edit Question
UPDATE question
	SET title = @new_title, question = @new_question, difficulty = @new_difficulty
    WHERE question_id = @q_id;
    
-- Add/update/delete test case
INSERT INTO test_case (question_id, input, output)
	VALUES (@q_id, @input, @output);
UPDATE test_case
	SET input = @new_input,
		output = @new_output
	WHERE question_id = @q_id;
DELETE FROM test_case
	WHERE case_id = @case_id;

-- Display/edit track, add/delete questions from track
SELECT question_id, title, question, writer_id, difficulty
	FROM question
    WHERE question_id IN (SELECT question_id
							FROM consists_of
                            WHERE track_id = @track_id);
UPDATE track
	SET name = @new_name, difficulty = @new_difficulty, duration = @new_duration
    WHERE track_id = @track_id;
INSERT INTO consists_of (track_id, question_id)
	VALUES (@track_id, @q_id);
DELETE FROM consists_of
	WHERE track_id = @track_id
		AND question_id = @q_id;

-- REPRESENTATIVE QUERIES

-- Display Followed Tracks
SELECT track.track_id, users.name, subjects.name, duration, difficulty, creation_date
	FROM track, users, subjects, follow
    WHERE track.track_id IN (SELECT track_id
								FROM follow
                                WHERE representative_id = @user_id)
		AND track.subject_id = subjects.subject_id
        AND writer_id = user_id
    ORDER BY creation_date DESC;

-- Follow/unfollow track
INSERT INTO follow (representative_id, track_id)
	VALUES (@user_id, @track_id);
DELETE FROM follow
	WHERE representative_id = @user_id
		AND track_id = @track_id;

-- Create interview request
INSERT INTO interview_request (sender_id, receiver_id, job_desc, deadline)
	VALUES (@user_id, @developer_id, @desc, @deadline);

-- Display interview requests
SELECT request_id, receiver_id, status, sent, deadline
	FROM interview_request
    WHERE sender_id = @user_id;