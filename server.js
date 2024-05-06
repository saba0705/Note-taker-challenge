const express = require('express');
const fs = require('fs');
const indexRouter = require('./routes/index');
const notesRouter = require('./routes/notes');

// Create the Express app
const app = express();

const PORT = process.env.PORT || 3001;



// Set up the app to use the routes 

app.use(express.urlencoded({ extended: true}));

app.use(express.json());

app.use(express.static('public'));

app.use('/', indexRouter);

app.use('/api', notesRouter);

// Start the server

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    });


