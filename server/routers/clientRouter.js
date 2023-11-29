const express = require('express');
const { Client, Parameter, Task, Habit } = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const client = await Client.findAll();
    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ошибка: `${error}` });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      firstName, lastName, birthday, paidTill, phoneNumber, curatorId,
    } = req.body;
    const client = await Client.create({
      firstName,
      lastName,
      birthday,
      paidTill,
      phoneNumber,
      curatorId,
    });
    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ошибка: `${error}` });
  }
});

router.get('/task', async (req, res) => {
  try {
    const tasks = await Task.findAll({
      raw: true,
    });
    res.json(tasks);
  } catch (error) {
    console.error(`Ошибка homeRoutes /: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // console.log("EEEEEEEEEEEEEE");
    const { id } = req.params;
    // console.log("gggggggggg")
    const client = await Client.findByPk(id);
    const parameter = await Parameter.findOne({ where: { clientId: id } });
    const habit = await Habit.findAll({ where: { clientId: id } });
    // console.log(parameter, 'paraametr');
    if (client && parameter && habit) {
      const response = { client, parameter, habit };
      res.json(response);
    } else {
      res.status(404).json({ error: 'Клиент не найден' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});




module.exports = router;
