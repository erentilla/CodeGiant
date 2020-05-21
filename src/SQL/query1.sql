INSERT INTO users (name, email, password, birth_date, type)
	VALUES (
			'tilla',
            'tilla@gmail.com',
            '123',
            '2010-10-10',
            'dev'
	);

SELECT *
	FROM users
    WHERE name = 'talha' AND password = '123';


SELECT track_id AS id, track.name AS name, subjects.name AS subject, difficulty, duration
FROM track, subjects
WHERE track.subject_id = subjects.subject_id
ORDER BY creation_date DESC;

SELECT question_id, title, question, writer_id, difficulty
	FROM question
    WHERE question_id IN (SELECT question_id
							FROM consists_of
                            WHERE track_id = 3);

SELECT question.question_id AS id, title, question.question as description
	FROM question, subjects, 
		(SELECT question_id, MIN(subject_id) AS subject_id
			FROM has_subject
            GROUP BY question_id) S
	WHERE S.question_id = question.question_id
		AND subjects.subject_id = S.subject_id;

INSERT INTO track (writer_id, subject_id, name, difficulty, duration)
	VALUES (6,
			(SELECT subject_id
				FROM subjects
                WHERE subjects.name = 'DFS'),
			'track0',
            'easy',
            '6:35:01');

INSERT INTO subjects (name, description)
	VALUES ('DFS', 'DFS iste');

SELECT * FROM USERS;

INSERT INTO question (writer_id, title, question)
	VALUES ( 7, 'demo question', '??????**??');
    
INSERT INTO has_subject (question_id, subject_id)
	VALUES (1,
			(SELECT subject_id
				FROM subjects
                WHERE name = 'DFS')
	);
    
INSERT INTO test_case (question_id, input, output)
	VALUES (1, 'demo input', 'demo output');
    
INSERT INTO consists_of (track_id, question_id)
	VALUES (3, 1);
    
SELECT * FROM question;
SELECT * FROM test_case;

DELETE FROM USERS WHERE type IS NOT NULL;