-- Drop tables if exists
DROP TABLE IF EXISTS replied_to;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS interview_request;
DROP TABLE IF EXISTS follow;
DROP TABLE IF EXISTS represents;
DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS participation;
DROP TABLE IF EXISTS report;
DROP TABLE IF EXISTS submitted_code;
DROP TABLE IF EXISTS is_featured;
DROP TABLE IF EXISTS consists_of;
DROP TABLE IF EXISTS track;
DROP TABLE IF EXISTS has_subject;
DROP TABLE IF EXISTS test_case;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS users;

-- Create tables
-- User related tables
CREATE TABLE users(
user_id	int NOT NULL AUTO_INCREMENT,
name	VARCHAR(20) NOT NULL UNIQUE,
email	VARCHAR(30) NOT NULL,
password	VARCHAR(20) NOT NULL,
birth_date	DATETIME,
user_bio	VARCHAR(100),
type		ENUM("dev", "adm", "rep") NOT NULL,
PRIMARY KEY (user_id)
);

-- Question related tables
CREATE TABLE subjects(
subject_id	int NOT NULL AUTO_INCREMENT,
name		VARCHAR(10) NOT NULL,
description	VARCHAR(100) NOT NULL,
PRIMARY KEY (subject_id)
);
CREATE TABLE question(
question_id		INT NOT NULL AUTO_INCREMENT,
writer_id		INT NOT NULL,
assessor_id		INT,
title			VARCHAR(15) NOT NULL,
question		VARCHAR(100) NOT NULL,
difficulty		ENUM ("easy", "medium", "hard", "extreme"),
status			ENUM( "waiting", "approved", "declined") DEFAULT ("waiting"),
creation_date	DATETIME DEFAULT CURRENT_TIMESTAMP,
assessment_date	DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (question_id),
CONSTRAINT fk_question_writer FOREIGN KEY (writer_id) REFERENCES users(user_id),
CONSTRAINT fk_question_assessor FOREIGN KEY (assessor_id) REFERENCES users(user_id)
);
CREATE TABLE test_case(
case_id		INT NOT NULL AUTO_INCREMENT,
question_id	INT NOT NULL,
input		VARCHAR(50),
output		VARCHAR(50) NOT NULL,
PRIMARY KEY (case_id, question_id),
CONSTRAINT fk_test_question	FOREIGN KEY (question_id) REFERENCES question(question_id)
);
CREATE TABLE has_subject(
question_id		INT NOT NULL,
subject_id		INT NOT NULL,
PRIMARY KEY (question_id, subject_id),
CONSTRAINT fk_has_subject_question FOREIGN KEY (question_id) REFERENCES question(question_id),
CONSTRAINT fk_has_subject_subject FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);

-- Track related tables
CREATE TABLE track(
track_id		INT NOT NULL AUTO_INCREMENT,
writer_id		INT NOT NULL,
subject_id		INT NOT NULL,
name			VARCHAR(20),
difficulty		ENUM ("easy", "medium", "hard", "extreme"),
duration		TIME,
creation_date	DATETIME DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (track_id),
CONSTRAINT fk_track_user FOREIGN KEY (writer_id) REFERENCES users(user_id),
CONSTRAINT fk_track_subject FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);
CREATE TABLE consists_of(
track_id		INT NOT NULL,
question_id		INT NOT NULL,
PRIMARY KEY (track_id, question_id),
CONSTRAINT fk_consist_track FOREIGN KEY (track_id) REFERENCES track(track_id),
CONSTRAINT fk_consist_question FOREIGN KEY (question_id) REFERENCES question(question_id)
);
CREATE TABLE is_featured(
track_id		INT NOT NULL,
feature_date	DATETIME NOT NULL,
PRIMARY KEY (track_id),
CONSTRAINT fk_featured_track FOREIGN KEY (track_id) REFERENCES track(track_id)
);

-- Submission related tables
CREATE TABLE submitted_code(
submission_id	INT NOT NULL AUTO_INCREMENT,
language			VARCHAR(15),
code			VARCHAR(300),
PRIMARY KEY (submission_id)
);
CREATE TABLE report(
report_id		INT NOT NULL AUTO_INCREMENT,
user_id			INT NOT NULL,
track_id		INT NOT NULL,
score			INT NOT NULL,
start_time		DATETIME NOT NULL,
finish_time		DATETIME NOT NULL,
PRIMARY KEY (report_id, user_id, track_id),
CONSTRAINT fk_report_user FOREIGN KEY (user_id) REFERENCES users(user_id),
CONSTRAINT fk_report_track FOREIGN KEY (track_id) REFERENCES track(track_id)
);
CREATE TABLE participation(
track_id			INT NOT NULL,
developer_id		INT NOT NULL,
question_id			INT NOT NULL,
submission_id		INT NOT NULL,
start_time			DATETIME NOT NULL,
finish_time			DATETIME NOT NULL,
PRIMARY KEY (track_id, developer_id),
CONSTRAINT fk_part_track FOREIGN KEY (track_id) REFERENCES track(track_id),
CONSTRAINT fk_part_user FOREIGN KEY (developer_id) REFERENCES users(user_id),
CONSTRAINT fk_part_question FOREIGN KEY (question_id) REFERENCES question(question_id),
CONSTRAINT fk_part_code	FOREIGN KEY (submission_id) REFERENCES submitted_code(submission_id)
);

-- Company related tables
CREATE TABLE company(
company_id		INT NOT NULL AUTO_INCREMENT,
name			VARCHAR(20) NOT NULL,
bio				VARCHAR(100),
PRIMARY KEY (company_id)
);
CREATE TABLE represents(
company_id			INT NOT NULL,
representative_id	INT NOT NULL,
PRIMARY KEY (company_id, representative_id),
CONSTRAINT fk_repr_company FOREIGN KEY (company_id) REFERENCES company(company_id),
CONSTRAINT fk_repr_user FOREIGN KEY (representative_id) REFERENCES users(user_id)
);
CREATE TABLE follow(
representative_id		INT NOT NULL,
track_id				INT NOT NULL,
PRIMARY KEY (representative_id, track_id),
CONSTRAINT fk_follow_user FOREIGN KEY (representative_id) REFERENCES users(user_id),
CONSTRAINT fk_follow_track FOREIGN KEY (track_id) REFERENCES track(track_id)
);
CREATE TABLE interview_request(
request_id		INT NOT NULL AUTO_INCREMENT,
sender_id		INT NOT NULL,
receiver_id		INT NOT NULL,
status			ENUM( "waiting", "accepted", "declined") DEFAULT ("waiting"),
job_desc		VARCHAR(100) NOT NULL,
sent			DATETIME NOT NULL,
deadline		DATETIME NOT NULL,
PRIMARY KEY (request_id),
CONSTRAINT fk_request_sender FOREIGN KEY (sender_id) REFERENCES users(user_id),
CONSTRAINT fk_request_receiver FOREIGN KEY (receiver_id) REFERENCES users(user_id)
);

-- Comment related tables
CREATE TABLE comments(
comment_id		INT NOT NULL AUTO_INCREMENT,
question_id		INT NOT NULL,
user_id			INT NOT NULL,
time			DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (comment_id),
CONSTRAINT fk_comment_question FOREIGN KEY (question_id) REFERENCES question(question_id),
CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE replied_to(
comment_id			INT NOT NULL,
replied_cmt_id		INT NOT NULL,
PRIMARY KEY (comment_id),
CONSTRAINT fk_reply_comment FOREIGN KEY (comment_id) REFERENCES comments(comment_id)
);
