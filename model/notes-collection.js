'use strict';

const NotesSchema = require('./notes-schema.js')

class Note {
    async create(text, category = 'general') {
        
        const newNote = new NotesSchema({category, text});
        let saved = await newNote.save();
        console.log(`Note Added: ${saved.text}`);
        return newNote.save();
    }

    async get(category) {
        if(category){
            let storedNotes = await NotesSchema.find({category : category});
            console.log(storedNotes);
            return storedNotes;
        } else {
            let storedNotes = await NotesSchema.find({});
            console.log(storedNotes);
            return storedNotes;
        }
    }

    async delete(id){
        await NotesSchema.deleteOne({_id : id});
        console.log('Note Deleted');
    }


}

module.exports = Note;
