const Joi = require('joi');
const express = require('express');
const app = express();
var mysql = require('mysql');
var cors = require('cors');


const API_ENDPOINT = "";

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// VARS


let users  = [];
let tracks = [];


{//////////////////////////////////////// ROUTES
    
    /**
    app.get('/', (req, res) => {
        res.send('Home');
    });
    */
    
    // MAIN ROUTES
    
    {// USER ROUTES
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
    }
    
    {// TRACK ROUTES
        // track get
        app.get('/tracks', (req, res) => {
            let result = {
                "tracks": [
                    {"id": 0, "name": "track0", "subject": "DFS", "difficulty": "hard", "duration": "5 mins"},
                    {"id": 3, "name": "track3", "subject": "DFS", "difficulty": "hard", "duration": "15 mins"},
                    {"id": 4, "name": "track4", "subject": "BFS", "difficulty": "easy", "duration": "52 mins"}
                ]
            };
            res.send(result);
        });
        
        // track post //TO BE DEVELOPED
        app.post('/tracks', (req, res) => {
            const {error} = validateTrack(req.body); // result.error
            if(error) return res.status(400).send(result.error.details[0].message);
            
            let track = {
                trackID     : req.body.trackID,
                trackName   : req.body.trackName,
                subject     : req.body.subject,
                difficulty  : req.body.difficulty,
                duration    : req.body.duration 
            };
            tracks.push(track);
            res.send(track);
        });
    }
    
    {// EXTRA ROUTES
        // log-in get
        app.get('/log-in', (req, res) => {
            let notFound = false;
            if (notFound) res.status(400).send('The user with the given parameters is not found.');
            let userid = req.query.userid;
            let password = req.query.password;
            console.log('log in - userid: ', userid);
            console.log('log in - password: ', password);
            let result = {
                role: "developer"
            };
            res.json(result);
        });
        
        // completed-tracks get //DATABASE CONNECTION
        app.get('/completed-tracks', (req, res) => {
            let notFound = false;
            if (notFound) res.status(400).send('The tracks with the given parameters are not found.');
            let userid = req.query.userid;
            console.log('completed tracks - userid: ', userid);
            let result = {
                "tracks": [
                    {"id": 0, "name": "track0 completed", "subject": "DFS", "difficulty": "hard", "duration": "5 mins"},
                    {"id": 3, "name": "track3  completed", "subject": "DFS", "difficulty": "hard", "duration": "15 mins"},
                    {"id": 4, "name": "track4  completed", "subject": "BFS", "difficulty": "easy", "duration": "52 mins"}
                ]
            }
            res.json(result);
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
        
        // submit-track get PROBLEMATIC
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
    }
}



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


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'dba',
    password: 'inevitable',
    database: 'codegiant'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("CONNECTED TO DB!");
});

let createUserSql = `
INSERT INTO users (name, email, password, birth_date)
	VALUES (
            'talha',
            'talha@t.com',
            '123',
            '2010-01-10'
	)
`;

let sql = `
INSERT INTO user_type (user_id, type)
    VALUES (
            (SELECT AUTO_INCREMENT - 1
                FROM information_schema.TABLES
                WHERE TABLE_SCHEMA = "codegiant"
                AND TABLE_NAME = "users"),
            "dev"
    )
`;

/*
connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
});
 */



connection.query("SELECT * FROM USER_TYPE", (err, result, fields) => {
    if (err) throw err;
    console.log(result);
});
 
connection.end();





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