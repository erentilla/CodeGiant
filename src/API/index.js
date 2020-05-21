const Joi = require('joi');
const express = require('express');
const app = express();
var mysql = require('mysql');
var cors = require('cors');
var Database = require('./Database.js');


const API_ENDPOINT = "";
const config = {
    host: 'localhost',
    user: 'dba',
    password: 'inevitable',
    database: 'codegiant'
};

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// VARS


let users  = [];
let tracks = [];

// user get
app.get('/users', (req, res) => {
    res.send(users);
});

// user post
app.post('/users', (req, res) => {
    const {error} = validateUser(req.body); // result.error
    if(error) return res.status(400).send(result.error.details[0].message);
    
    let user = {
        userID: req.body.userID,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    };
    users.push(user);
    res.send(user);
});

    
// TRACK ROUTES
// track get
app.get('/tracks', (req, res) => {
    /**
        let result = {
            "tracks": [
                {"id": 0, "name": "track0", "subject": "DFS", "difficulty": "hard", "duration": "5 mins"},
                {"id": 3, "name": "track3", "subject": "DFS", "difficulty": "hard", "duration": "15 mins"},
                {"id": 4, "name": "track4", "subject": "BFS", "difficulty": "easy", "duration": "52 mins"}
            ]
             */
        let database = new Database(config);

        let sql = `
            SELECT track_id AS id, track.name AS name, subjects.name AS subject, difficulty, duration
            FROM track, subjects
            WHERE track.subject_id = subjects.subject_id
            ORDER BY creation_date DESC;
        `;

        database.query(sql).then(result => {
            console.log("tracks result: ", result);
            let send = {
                tracks: result
            };
            res.json(send);
        }).then(() => {
            database.close();
        });
});

// EXTRA ROUTES
    // log-in get
app.get('/log-in', (req, res) => {
    
    let username = req.query.username;
    let password = req.query.password;
    /**
    console.log('log in - username: ', username);
    console.log('log in - password: ', password);
     */
    let database = new Database(config);

    let sql = `
        SELECT *
        FROM users
        WHERE name = '${username}' AND password = '${password}';
    `; 

    database.query(sql).then((result) => {
        console.log(result);
        if (result === null || result.length < 1) {
            res.status(400).send('The user with the given parameters is not found.');
            return;
        }
        let queryResult = result[0];
        let send = {
            role: queryResult.type,
            userid: queryResult.user_id
        };
        res.json(send);
    }).then(() => {
        database.close();
    });
});

app.get('/questions', (req, res) => {
    
    /**
    console.log('log in - username: ', username);
    console.log('log in - password: ', password);
     */
    /**
    var connection = mysql.createConnection(config); // TODO: sil?
    connection.connect(function(err) {
        if (err) throw err;
        console.log("CONNECTED TO DB!");
    });
 */
    let sql = `
        SELECT question.question_id AS id, title, question.question as description
	    FROM question, subjects, 
		(SELECT question_id, MIN(subject_id) AS subject_id
			FROM has_subject
            GROUP BY question_id) S
	    WHERE S.question_id = question.question_id
		AND subjects.subject_id = S.subject_id;
    `;
    let database = new Database(config);
    database.query(sql).then((result) => {
        //if (err) throw err;
        console.log(result);
        if (result === null || result.length < 1) {
            res.status(400).send('No questions??? problem error???.');
            return;
        }
        res.json({questions: result});
    }).then(() => {
        database.close();
    });
        
    //connection.end();
});

// completed-tracks get //DATABASE CONNECTION
app.get('/completed-tracks', (req, res) => {
    let notFound = false;
    if (notFound) res.status(400).send('The tracks with the given parameters are not found.');
    let userid = req.query.userid;
    console.log('completed tracks - userid: ', userid);

    let sql = `
        SELECT report.track_id AS id, track.name AS name, subjects.name AS subject, difficulty AS difficulty, finish_time-start_time AS duration
        FROM report, subjects, track
        WHERE user_id = ${userid}
        AND report.track_id = track.track_id
        AND track.subject_id = subjects.subject_id
    `;


    let database = new Database(config);
    database.query(sql).then(rows => {
        res.json({tracks: rows});
    }).then(() => database.close());
});

// questions-of-track //DATABASE CONNECTION
app.get('/questions-of-track', (req, res) => {
    let notFound = false;
    if (notFound) res.status(400).send('The track with the given parameters is not found.');
    let trackid = req.query.trackid;
    console.log('questions of track - trackid: ', trackid);
    let result = {
        "questions": [
            {"id": 4, "title": "question4", "description": "blablablablabla", "test-cases": [{"case-id": 0, "case": 1}]},
            {"id": 0, "title": "question0", "description": "LMAOOO", "test-cases": [{"case-id": 0, "case": 1}]},
            {"id": 3, "title": "question3", "description": "XDXDXDXD", "test-cases": [{"case-id": 0, "case": 1}]}
        ]
    }
    res.json(result);
});

// report get //DATABASE CONNECTION
app.get('/report', (req, res) => {
    let notFound = false;
    if (notFound) res.status(400).send('The report with the given parameters are not found.');
    let userid = req.query.userid;
    let trackid = req.query.trackid;
    console.log('report - userid: ', userid);
    console.log('report - trackid: ', trackid);
    let result = {
        "question_results": [
            {"question_id": 0, "question_title": "a nice question", "score": 100},
            {"question_id": 1, "question_title": "a terrible question", "score": 5}
        ],
        "total_score": 90
    };
    res.json(result);
});

app.post('/create-question', (req, res) => {
    let userid = req.body.userid;
    let question = req.body.question;
    let testcases = req.body.testcases;
    let language = req.body.language;
    let subject = req.body.subject;
    let difficulty = req.body.difficulty;
    let title = 'titlexd' // TODO: add title :D
    console.log(req.body);

    let database = new Database(config);
	let insertQuestion = `
                INSERT INTO question (writer_id, title, question)
			    VALUES ( ${userid}, '${title}', '${question}')
            `;
    

 	database.query(insertQuestion);

	let lastInsertId = `
                SELECT LAST_INSERT_ID() AS id
            `;
	let question_id = 1;
    database.query(lastInsertId).then(result => {
        question_id = result[0].id
        console.log("- ----------QUESTION ID: ", question_id);
    }).then(() => {
        let insertSubject = `
                INSERT INTO has_subject (question_id, subject_id)
			    VALUES (${question_id},
				(SELECT subject_id
				FROM subjects
                		WHERE name = '${subject}')
				)
            `;

        database.query(insertSubject);
        
        for (let i = 0; i < testcases.length; i++) {
            let sql = `
                        INSERT INTO test_case (question_id, input, output)
                        VALUES (${question_id}, '${testcases[i][0]}', '${testcases[i][1]}')
                    `;

            database.query(sql);
        }
        res.json();
    });
    database.close();
});

app.post('/submit-track', (req, res) => {
    let userid = req.body.userid;
    let submission = req.body.submission;
    console.log('submit track - userid: ', userid);
    console.log("submit track - submission: ", submission);
    res.send();
});


app.get('/leaderboard', (req, res) => {
    let notFound = false;
    if (notFound) res.status(400).send('The leaderboard with the given parameters are not found.');
    let trackid = req.query.trackid;
    console.log("leaderboard - trackid: ", trackid);
    let result = {
        "leaderboard": [
            {"user_id": "baba", "score": 100},
            {"user_id": "mehmet", "score": 70},
            {"user_id": "lmao", "score": 50},
            {"user_id": "alko", "score": 0}
        ]
    };
    res.json(result);
});

// interviews
app.get('/interviews', (req, res) => {
    let notFound = false;
    if (notFound) res.status(400).send('The interviews with the given parameters are not found.');
    let userid = req.query.userid;
    
    let database = new Database(config);

    let sql = `
            SELECT request_id AS interview_id, company.name AS company_title, deadline, job_desc AS job_description
        FROM interview_request, represents, company
            WHERE sender_id = ${user_id}
            AND interview_request.sender_id = represents.representative_id
                AND represents.company_id = company.company_id
        `;
    database.query(sql).then(result => {
        let send = {
            interviews: result
        };
        res.json(send);
    })
    database.close();
});

// FUNCTIONS
// user validation
function validateUser(user){
    let schema = {
        userID  : Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        role:     Joi.string().required()
    };
    
    return Joi.validate(user, schema);
};

// user validation
function validateTrack(track){
    let schema = {
        trackID     : Joi.string().required(),
        trackName   : Joi.string().required(),
        subject     : Joi.string().required(),
        difficulty  : Joi.string().required(),
        duration    : Joi.string().required()
    };
    
    return Joi.validate(track, schema);
};


// PORT
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));




/**
app.put('/api/users/:username', (req, res) => {
    //Look up
    let user = users.find(c => c.username == req.params.username);
    if (!user) res.status(400).send('The user with the given parameters is not found.');
    
    //Validate
    const {error} = validateUser(req.body); // result.error
    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    
    //Update & Return
    user.username = req.body.name;
    res.send(course);
});
*/