'use strict';

jest.mock('minimist');
const minimist = require('minimist');
require('@code-fellows/supergoose');

minimist.mockImplementation(() => {
    return {
        a: 'I\'m a note, I\'m a note, I\'m a note, I\'m a note, I\'m a note, I\'m a note, I\'m a note, I\'m a note, I\'m a note!'
    }
})

const Input = require('../lib/input.js');

describe('Input Module', () => {
    

    it('valid() accepts a proper object', () => {
        let options = new Input();
        expect(options.valid()).toBeTruthy();
    })

    it('valid() rejects an invalid object', () => {
        let options = new Input();
        options.command = {};
        expect(options.valid()).toBeFalsy();
    })
    
    it('valid() should reject if options.command.payload is not a string', () => {
        let options = new Input();
        options.command.payload = true;
        expect(options.valid()).toBeFalsy();
    })
})

describe('Input parser', () => {
    it('parse() action accepts a and returns add', () => {
        let options = new Input();
        let command = options.parse({ a: 'test' });
        expect(command.action).toBe('add');
        expect(command.payload).toBe('test');
    })
    it('parse() action accepts add and returns add', () => {
        let options = new Input();
        let command = options.parse({ a: 'test' });
        expect(command.action).toBe('add');
        expect(command.payload).toBe('test');
    })
    it('parse() action accepts l and returns list', () => {
        let options = new Input();
        let command = options.parse({ l: 'test' });
        expect(command.action).toBe('list');
        expect(command.payload).toBe('test');
    })
    it('parse() action accepts list and returns list', () => {
        let options = new Input();
        let command = options.parse({ list: 'test' });
        expect(command.action).toBe('list');
        expect(command.payload).toBe('test');
    })
    it('parse() action accepts d and returns deletes', () => {
        let options = new Input();
        let command = options.parse({ d: 'test' });
        expect(command.action).toBe('delete');
        expect(command.payload).toBe('test');
    })
    it('parse() action accepts delete and returns deletes', () => {
        let options = new Input();
        let command = options.parse({ delete: 'test' });
        expect(command.action).toBe('delete');
        expect(command.payload).toBe('test');
    })
})

describe('parse category', () => {
    it('should parse --list with payload and --catagory', () => {
        const input = new Input();
        const command = input.parse({ list : true});
        expect(command.action).toBe('list');
        expect(command.category).toBe('general');
    })
})

const Note = require('../lib/notes.js');

describe('Notes Module', () => {
    it('makes sure nothing is logged if no command given', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        let options = new Input();
        let testNote = new Note(options);
        testNote.action = {};
        return testNote.execute()
            .then(results => {
                expect(consoleSpy).not.toHaveBeenCalled();
            })
    })
    it('makes sure with valid data that add() is called inside execute() and logs to console', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        let options = new Input();
        let testNote = new Note(options);
        const addSpy = jest.spyOn(testNote, 'add');
        return testNote.execute(testNote.payload)
            .then(results => {
                expect(consoleSpy).toHaveBeenCalledWith(`Note Added: ${testNote.payload}`);
                expect(addSpy).toHaveBeenCalled();
            })
      
    })
    it('should delete an existing note when you call delete()', () => {
        let options = new Input();
        let testNote = new Note(options);
        const consoleSpy = jest.spyOn(console, 'log');
        return testNote.execute(testNote.payload)
            .then(r => {
                let listTest = {
                    command : {
                        action : 'list',
                        payload : true,
                        category : 'general',
                    }
                }
                let getList = new Note( listTest )
                testNote.execute(getList)
                    .then(results => {
                        console.log(results)
                        expect(consoleSpy).toHaveBeenCalled();
                    })
            })
    })
})

