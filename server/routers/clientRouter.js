const express = require('express');
const { Client, Parameter } = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const client = await Client.findAll();
    const data = client.map((el) => el.get({ plain: true }));
    // console.log(data, 'IIIIIIIIIIIIIIIi');
    // console.log(client, '$$$$$$$$$$$$$$$$$$$$4');
    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ошибка: `${error}` });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // console.log("EEEEEEEEEEEEEE");
    const { id } = req.params;
    // console.log("gggggggggg")
    const client = await Client.findByPk(id);
    console.log(client, 'cliiient');
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ error: 'Клиент не найден' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


router.get('/param', async (req, res) => {
  try {
    const { weight, chest, waist, hips, BMI, clientId } = req.query;
    const allParameters = await Parameter.findAll({
      include: Parameter,
    });
    console.log('LLLLLLLLL')
    res.json(allParameters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});


module.exports = router;
