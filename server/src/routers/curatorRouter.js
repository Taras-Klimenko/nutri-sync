const express = require('express');
const { Curator} = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const curator = await Curator.findAll();
        res.json(curator);
    } catch (error) {
        console.error(error);
        res.status(500).json({ ошибка: `${error}` });
    }
});

module.exports = router;
