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

router.get('/:id',
    (request, response) => {

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

router.patch('/:id', 
    (request, response) => {

    }
);

router.delete('/:id',
    (request, response) => {

    }
);


module.exports = router;