const Joi = require('joi');
const express = require('express');
const app = express();

// MIDDLEWARE
app.use(express.json());

// VARS
let users = [];

{//////////////////////////////////////// ROUTES

/**
app.get('/', (req, res) => {
    res.send('Home');
});
*/

// MAIN ROUTES
app.get('/api/users', (req, res) => {
    res.send(users);
});

app.post('/api/users', (req, res) => {
    const {error} = validateUser(req.body); // result.error
    if(error) return res.status(400).send(result.error.details[0].message);

    let user = {
        userID: req.body.userID,
        username: req.body.username,
        password: req.body.password
    };
    users.push(user);
    res.send(user);
});


// EXTRA API'S
app.get('/api/log-in', (req, res) => {
    let user = users.find(c => c.username == req.query.username && c.password == req.query.password);
    if (!user) res.status(400).send('The user with the given parameters is not found.');
    res.json({username: user.username});
});



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


}


// FUNCTIONS
function validateUser(user){
    let schema = {
        userID  : Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required()
    };

    return Joi.validate(user, schema);
};


// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));