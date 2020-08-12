'use strict';

class Note {
    constructor(newNote){
       this.action = newNote.command.action;
       this.payload = newNote.command.payload;
    }
    execute(){
        if(this.action === 'add') {
            this.add(this.payload)
        } // this will eventually do more than just add and may at some point be converted to a switch
    }
    add(text){
        
        console.log('Adding Note:', text);
    }
}

module.exports = Note;
