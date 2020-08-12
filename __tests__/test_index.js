'use strict';

jest.mock('minimist');
const minimist = require('minimist');

minimist.mockImplementation(() => {
    return {
        a: 'I\'m a note, I\'m a note, I\'m a note, I\'m a note, I\'m a note, I\'m a note, I\'m a note, I\'m a note, I\'m a note!'
    }
})

const Input = require('../lib/input.js');

describe('Input Module', () => {
    it('parse() creates a good object', () => {
        let options = new Input();
        let command = options.parse({ a: 'test' });
        expect(command.action).toBe('add');
        expect(command.payload).toBe('test');
    })

    it('valid() accepts a proper object', () => {
        let options = new Input();
        expect(options.valid()).toBeTruthy();
    })

    it('valid() rejects an invalid object', () => {
        let options = new Input();
        options.command = {};
        expect(options.valid()).toBeFalsy();
    })
})

const Notes = require('../lib/notes.js');
const Note = require('../lib/notes.js');

describe('Notes Module', () => {
    it('makes sure nothing is logged if no command given', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        let options = new Input();
        let testNote = new Note(options);
        testNote.action = {};
        testNote.execute(testNote.payload);
        expect(consoleSpy).not.toHaveBeenCalled(); // there has to be a different thing for this but I can't be bothered
    })
    it('makes sure with valid data that add() is called inside execute() and logs to console', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        let options = new Input();
        let testNote = new Notes(options);
        testNote.execute(testNote.payload);
        expect(consoleSpy).toHaveBeenCalledWith('Adding Note:', testNote.payload);
    })
})

