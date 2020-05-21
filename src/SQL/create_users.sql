DROP USER IF EXISTS 'patrol';
DROP USER IF EXISTS 'dev';
DROP USER IF EXISTS 'representative';
DROP USER IF EXISTS 'admin';
DROP USER IF EXISTS 'dba';

-- Authentification
CREATE USER 'patrol' IDENTIFIED BY 'stop';
GRANT SELECT, INSERT ON codegiant.users TO 'patrol';
GRANT SELECT, INSERT ON codegiant.user_type TO 'patrol';

-- Privileges of developer users
CREATE USER 'dev' IDENTIFIED BY 'giant';
GRANT SELECT, INSERT, UPDATE, DELETE ON codegiant.comments TO 'dev';
GRANT SELECT ON codegiant.company TO 'dev';
GRANT SELECT ON codegiant.consists_of TO 'dev';
GRANT SELECT, INSERT ON codegiant.has_subject TO 'dev';
GRANT SELECT, UPDATE ON codegiant.interview_request TO 'dev';
GRANT SELECT ON codegiant.is_featured TO 'dev';
GRANT SELECT, INSERT ON codegiant.participation TO 'dev';
GRANT SELECT, INSERT ON codegiant.question TO 'dev';
GRANT SELECT, INSERT, DELETE ON codegiant.replied_to TO 'dev';
GRANT SELECT ON codegiant.report TO 'dev';
GRANT SELECT ON codegiant.represents TO 'dev';
GRANT SELECT ON codegiant.subjects TO 'dev';
GRANT SELECT, INSERT, DELETE ON codegiant.submitted_code TO 'dev';
GRANT SELECT, INSERT ON codegiant.test_case TO 'dev';
GRANT SELECT ON codegiant.track TO 'dev';
GRANT SELECT ON codegiant.user_type TO 'dev';
GRANT SELECT, UPDATE ON codegiant.users TO 'dev';

-- Privileges of representative users
CREATE USER 'representative' IDENTIFIED BY 'hired';
GRANT SELECT, INSERT, UPDATE, DELETE ON codegiant.comments TO 'representative';
GRANT SELECT, UPDATE ON codegiant.company TO 'representative';
GRANT SELECT, INSERT, DELETE ON codegiant.consists_of TO 'representative';
GRANT SELECT, INSERT, DELETE ON codegiant.follow TO 'representative';
GRANT SELECT, INSERT, DELETE ON codegiant.has_subject TO 'representative';
GRANT SELECT, INSERT, UPDATE, DELETE ON codegiant.interview_request TO 'representative';
GRANT SELECT ON codegiant.is_featured TO 'representative';
GRANT SELECT, INSERT ON codegiant.participation TO 'representative';
GRANT SELECT, INSERT, UPDATE, DELETE ON codegiant.question TO 'representative';
GRANT SELECT, INSERT, DELETE ON codegiant.replied_to TO 'representative';
GRANT SELECT, INSERT, UPDATE, DELETE ON codegiant.report TO 'representative';
GRANT SELECT ON codegiant.represents TO 'representative';
GRANT SELECT ON codegiant.subjects TO 'representative';
GRANT SELECT, INSERT, DELETE ON codegiant.submitted_code TO 'representative';
GRANT SELECT, INSERT, UPDATE, DELETE ON codegiant.test_case TO 'representative';
GRANT SELECT, INSERT, UPDATE, DELETE ON codegiant.track TO 'representative';
GRANT SELECT ON codegiant.user_type TO 'representative';
GRANT SELECT, UPDATE ON codegiant.users TO 'representative';

-- Privileges of admin users
CREATE USER 'admin' IDENTIFIED BY 'bruh';
GRANT SELECT, INSERT, UPDATE, DELETE ON codegiant.comments TO 'admin';
GRANT SELECT, INSERT, UPDATE, DELETE ON codegiant.company TO 'admin';
GRANT SELECT, INSERT, DELETE ON codegiant.consists_of TO 'admin';
GRANT SELECT, DELETE ON codegiant.follow TO 'admin';
GRANT SELECT, INSERT, DELETE ON codegiant.has_subject TO 'admin';
GRANT SELECT ON codegiant.interview_request TO 'admin';
GRANT SELECT, INSERT, DELETE ON codegiant.is_featured TO 'admin';
GRANT SELECT, INSERT, DELETE ON codegiant.participation TO 'admin';
GRANT SELECT, INSERT, UPDATE, DELETE ON codegiant.question TO 'admin';
GRANT SELECT, INSERT, DELETE ON codegiant.replied_to TO 'admin';
GRANT SELECT, INSERT, UPDATE, DELETE ON codegiant.report TO 'admin';
GRANT SELECT, INSERT, DELETE ON codegiant.represents TO 'admin';
GRANT SELECT, INSERT, UPDATE, DELETE ON codegiant.subjects TO 'admin';
GRANT SELECT, INSERT, DELETE ON codegiant.submitted_code TO 'admin';
GRANT SELECT, INSERT, UPDATE, DELETE ON codegiant.test_case TO 'admin';
GRANT SELECT, INSERT, UPDATE, DELETE ON codegiant.track TO 'admin';
GRANT SELECT, UPDATE ON codegiant.user_type TO 'admin';
GRANT SELECT, UPDATE ON codegiant.users TO 'admin';

-- Privileges of dba
CREATE USER 'dba' IDENTIFIED BY 'inevitable';
GRANT ALL ON codegiant.* TO 'dba';