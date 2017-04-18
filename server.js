const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//Heroku ce postaviti process.env.PORT 
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurentYear' , () => new Date().getFullYear());
/*
    hbs.registerHelper('getCurentYear' , () => {
        return new Date().getFullYear();
    });
*/

hbs.registerHelper('screamIt' , (text) => text.toUpperCase());
/*
    hbs.registerHelper('screamIt' , (text) => {
        return text.toUpperCase();
    });
*/

app.get('/', (req, res) => {
/*
    res.send('<h1>Hello Express!!!</h1>');
    res.send({
        name: 'Marko',
        likes: [
            'Programing',
            'Workout'
        ]
    });
*/
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Wellcome to my website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/project', (req, res) => {
    res.render('project.hbs', {
        pageTitle: 'Project page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handel request'
    });
});

//Heroku zahteva promenu porta da bude dinamicki
//Koristicemo enviroment varijablu koju ce heroku da postavi
//Varijablu koju ce Heroku da koristi je PORT
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
