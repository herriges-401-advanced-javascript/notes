'use strict';

function Note(newNote){
    this.execute(newNote);
}

Note.prototype.execute = function (note) {
   if(note.action === 'add') {
    this.add(note.payload)
   }
}

Note.prototype.add = function (text) {
    this.id = new Date().getTime();
    this.text = text;
    console.log('Adding Note:', this.text);
}

module.exports = Note;
