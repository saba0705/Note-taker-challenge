const router = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

console.log(readFromFile);

//get route to fetch notes
router.get("/notes", (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
}
);


//post req to add new notes
router.post("/notes", (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json');
        res.json('Note added');
    }
    else {
        res.json('Error in adding note');
    }
}
);




router.delete("/notes/:id", (req, res) => {
    let data = fs.readFileSync('./db/db.json', 'utf8');
    const dataJSON = JSON.parse(data);
    const newNotes = dataJSON.filter((note) => note.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(newNotes));
    res.json(newNotes);
}
);


module.exports = router;

