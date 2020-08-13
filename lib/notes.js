'use strict';

const NotesModel = require('./notes-schema');

class Note {
    constructor(newNote){
       this.action = newNote.command.action;
       this.payload = newNote.command.payload;
       this.category = newNote.command.category;
    }
    async execute(){
        switch(this.action){
            case 'add':
                return this.add(this.payload, this.category);
            case 'list':
                return this.list(this.category);
            case 'delete':
                return this.delete(this.payload);
            default:
                return Promise.resolve();
        }
     
    }
    async add(text, category){
        
        const newNote = new NotesModel({category, text});

        let saved = await newNote.save();

        console.log(`Note Added: ${saved.text}`);
        return saved;
    }
    async list(category){
        let storedNotes = await NotesModel.find({category : category});
        console.log(storedNotes);
        return storedNotes;
    }
    async delete(id){
        await NotesModel.deleteOne({_id : id});
        console.log('Note deleted');
    }
}

module.exports = Note;
