#!/usr/bin/env node
'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notesy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Input = require('./lib/input.js');
const Note = require('./lib/notes.js');

const input = new Input();
const notes = new Note(input);

if(input.valid()){
    notes.execute()
        .then(mongoose.disconnect)
        .catch(error => console.error(error));
} else {
    help();
}

function help() {
    console.log('there\'s been a problem')
    process.exit();
}

