const Joi = require('joi');
const express = require('express');
const app = express();

// MIDDLEWARE
app.use(express.json());

// VARS
let users  = [
    {
        "userID": "100",
        "username": "tilla",
        "password": "123",
        "role": "admin"
    },
    {
        "userID": "110",
        "username": "talha",
        "password": "456",
        "role": "developer"
    }
];
let tracks = { "tracks" : [{
        "trackID"     : "1000",
        "trackName"   : "Google",
        "subject"     : "DFS",
        "difficulty"  : "Hard",
        "duration"    : "20 mins"
    },
    {
        "trackID"     : "2000",
        "trackName"   : "Google",
        "subject"     : "BFS",
        "difficulty"  : "Easy",
        "duration"    : "10 mins" 
    }]
};

{//////////////////////////////////////// ROUTES

/**
app.get('/', (req, res) => {
    res.send('Home');
});
*/

// MAIN ROUTES

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
app.get('/api/tracks', (req, res) => {
    res.send(tracks);
});

// track post //TO BE DEVELOPED
app.post('/api/tracks', (req, res) => {
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
app.get('/api/log-in', (req, res) => {
    let user = users.find(c => c.userID == req.query.userID && c.password == req.query.password);
    if (!user) res.status(400).send('The user with the given parameters is not found.');
    res.json({role: user.role});
});

// completed-tracks get //DATABASE CONNECTION
app.get('/api/completed-tracks', (req, res) => {
    let user = users.find(c => c.userID == req.query.userID);
    if (!user) res.status(400).send('The tracks with the given parameters are not found.');
    res.json({tracks: []});
});

// questions-of-track //DATABASE CONNECTION
app.get('/api/questions-of-track', (req, res) => {
    let track = tracks.tracks.find(c => c.trackID == req.query.trackID);
    if (!track) res.status(400).send('The track with the given parameters is not found.');
    res.json({questions: []});
});

// report get //DATABASE CONNECTION
app.get('/api/report', (req, res) => {
    let user  = users.find(c => c.userID == req.query.userID);
    let track = tracks.tracks.find(c =>c.trackID == req.query.trackID);
    if (!user || !track) res.status(400).send('The report with the given parameters are not found.');
    res.json({total_score: '0'});
});

// submit-track get PROBLEMATIC
app.post('/api/submit-track', (req, res) => {
    let track = req.params;
    tracks.tracks.push(track);
    //res.send({submission: [track.body]});
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
const port = process.env.PORT || 3000;
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