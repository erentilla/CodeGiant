INSERT INTO users (name, email, password, birth_date, type)
	VALUES (
			'tilla',
            'tilla@gmail.com',
            '12312312',
            '2010-10-10',
            'adm'
	);

DELETE FROM USERS WHERE type = 'adm';
SELECT * FROM USERS