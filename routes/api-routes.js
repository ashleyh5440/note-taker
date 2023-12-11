// GET /api/notes should read the db.json file and return all saved notes as JSON.

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

// DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
const router = require('express').Router();
const fs = require('fs');
const {v4 : uuidv4} = require('uuid'); 
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fs.js')

router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then(data => res.json(JSON.parse(data))) 
});

router.post('/notes', (req, res) => {
    const newNote = {title: req.body.title, text: req.body.text, id: uuidv4()} 
        readAndAppend(newNote, "./db/db.json");
        res.json(newNote);
});

router.delete('/notes/:id', (req, res) => {
    readAndDelete(req.params.id, "./db/db.json") 
    res.json("Deleted")
});

module.exports = router;