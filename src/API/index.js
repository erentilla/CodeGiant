const Joi = require('joi');
const express = require('express');
const app = express();
var mysql = require('mysql');


// MIDDLEWARE
app.use(express.json());

// VARS
let users  = [];
let tracks = [];


{//////////////////////////////////////// ROUTES
    
    {// USER ROUTES
        // user get
        app.get('/api/users', (req, res) => {
            res.send(users);
        });
        
        // user post
        app.post('/api/users', (req, res) => {
            const {error} = validateUser(req.body); // result.error
            if(error) return res.status(400).send(result.error.details[0].message);
            
            let user = {
                userid: req.body.userid,
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
        app.get('/api/tracks', (req, res) => {
            res.send(tracks);
        });
        
        // track post //TO BE DEVELOPED
        app.post('/api/tracks', (req, res) => {
            const {error} = validateTrack(req.body); // result.error
            if(error) return res.status(400).send(result.error.details[0].message);
            
            let track = {
                id     : req.body.id,
                name        : req.body.name,
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
        app.get('/api/log-in', (req, res) => {
            let user = users.find(c => c.userid == req.query.userid && c.password == req.query.password);
            if (!user) res.status(400).send('The user with the given parameters is not found.');
            res.json({role: user.role});
        });
        
        // completed-tracks get //DATABASE CONNECTION
        app.get('/api/completed-tracks', (req, res) => {
            let user = users.find(c => c.userid == req.query.userid);
            if (!user) res.status(400).send('The tracks with the given parameters are not found.');
            res.json({tracks: []});
        });
        
        // questions-of-track //DATABASE CONNECTION
        app.get('/api/questions-of-track', (req, res) => {
            let track = tracks.tracks.find(c => c.id == req.query.id);
            if (!track) res.status(400).send('The track with the given parameters is not found.');
            res.json({questions: []});
        });
        
        // report get //DATABASE CONNECTION
        app.get('/api/report', (req, res) => {
            let user  = users.find(c => c.userid == req.query.userid);
            let track = tracks.tracks.find(c =>c.id == req.query.id);
            if (!user || !track) res.status(400).send('The report with the given parameters are not found.');
            res.json({total_score: '0'});
        });
        
        // submit-track get PROBLEMATIC
        app.post('/api/submit-track', (req, res) => {
            let track = req.params.userid;
            tracks.tracks.push(track);
            //res.send({submission: [track.body]});
        });
        
    }
}



// FUNCTIONS
// user validation
function validateUser(user){
    let schema = {
        userid  : Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        role:     Joi.string().required()
    };
    
    return Joi.validate(user, schema);
};

// user validation
function validateTrack(track){
    let schema = {
        id          : Joi.string().required(),
        name        : Joi.string().required(),
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
