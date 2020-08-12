#!/usr/bin/env node
'use strict';

const Input = require('./lib/input.js');
const Note = require('./lib/notes.js');

const input = new Input();
const command = new Note(input);

input.valid() ? command.execute() : help();

function help() {
    console.log('there\'s been a problem')
    process.exit();
}

