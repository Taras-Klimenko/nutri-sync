const express = require('express');

const router = express.Router();
const { Parameter } = require('../../db/models');

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const parameters = await Parameter.findAll({
      where: { clientId: id },
      raw: true,
    });
    if (!parameters) {
      res.status(200).json({ error: 'Нет параметров.' });
    }

    res.status(200).json(parameters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('ID->', id);
    const { weight } = req.body;
    const newParameter = await Parameter.create({
      clientId: id,
      weight,
    });

    res.status(200).json(newParameter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
