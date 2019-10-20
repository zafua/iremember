const express = require('express');
const router = express.Router();
const Word = require('../models/word');

router.get('/', 
    async (request, response) => {
        try {
            const words = await Word.find();
            response.json(words);
        } catch (error) {
            response.status(500).json({
                message: error.message
            });
        }
    }
);

router.get('/:id', getWord,
    (request, response) => {
        response.json(response.word);
    }
);

router.post('/',
    async (request, response) => {
        

        try {
            //const word = new Word();
            const word = new Word({
                 word: request.body.word,
                 meaning: request.body.meaning
             });
             console.log(request.body);
            const newWord = await word.save();
            response.status(201).json(newWord);
        } catch (error) {
            response.status(400).json({message:error.message});
        }
    }
);

router.patch('/:id', getWord,
    async (request, response) => {
        if(request.body.word){
            response.word.word = request.body.word;
        }
        if(request.body.meaning){
            response.word.meaning = request.body.meaning;
        }
        try {
            const updatedWord = await response.word.save();
            response.json(updatedWord);
        } catch (error) {
            response.status(400).json({message: error.message});
        }
    }
);

router.delete('/:id', getWord,
    async (request, response) => {
        try {
            await response.word.remove();
            response.json({message: 'Deleted ' + response.word.word + 'id: ' + request.params.id});
        } catch (error) {
            response.status(500).json({message: error.message});
        }
    }
);

async function getWord(request, response, next){
    try {
        word = await Word.findById(request.params.id);
        if(word == null)
        return response.status(404).json({message: 'Kelime bulunamadı'});
    } catch (error) {
        return response.status(500).json({message: error.message});
    }

    response.word = word;
    next();
};

module.exports = router;