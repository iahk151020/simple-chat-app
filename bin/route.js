const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/user');

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/login', (req, res) => {
    let user = req.body;
    User.checkUser(user)
    .then(user => {
        req.session.user = user;
        req.session.save();
        res.redirect('/main');
    })
    .catch(err => {
        res.status(500).send(err);
    })
    
})

router.get('/main', (req, res) => {
    //console.log(1,req.session.user);
    res.sendFile(path.join(__dirname, '../views/index.html'));
})

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

router.post('/register', (req, res) => {
    let user = req.body;
    User.addUser(user)
    .then(user => {
        res.redirect('/login');
    })
    .catch(err => res.status(500).send(err));
    
})

module.exports = router;