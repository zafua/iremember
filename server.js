require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const wordsRouter = require('./routes/words');

mongoose.connect(process.env.DATABASE_URL, 
    {
        useNewUrlParser: true
    });

const db = mongoose.connection;

db.on('error',
    (error)=> {
        console.log("HATA--" + error);
    });

db.once('open', 
    () => {
        console.log("connected to db");
    });

app.use(express.json());

app.use('/words', wordsRouter);

app.listen(3333, () => console.log("The server started"));