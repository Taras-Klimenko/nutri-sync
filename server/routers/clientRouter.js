const express = require('express');

const {
  Client, Parameter, Curator, Task, Habit,
} = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const client = await Client.findAll({
      include: { model: Curator },
    });
    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ошибка: `${error}` });
  }
});

router.post('/', async (req, res) => {
  console.log(req.body, 'OOOOOOOOOOOOOO');
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

router.patch('/update/:id', async (req, res) => {
  const { Id } = req.params;
  try {
    const client = await Client.findByPk(Id);

    if (!client) {
      return res.status(404).json({ сообщение: 'Клиент не найден' });
    }

    const {
      firstName, lastName, birthday, paidTill, phoneNumber, curatorId,
    } = req.body;
    await client.update({
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
router.delete('/update/:id', async (req, res) => {
  try {
    await Client.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
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
    // console.log(id);
    if (!id) {
      res.status(400).json({ error: 'Client ID is missing in the request' });
      console.log('##########################');
      return;
    }
    // console.log("gggggggggg")
    const client = await Client.findByPk(id);
    const parameter = await Parameter.findOne({ where: { clientId: id } });
    const habit = await Habit.findAll();
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    if (client) {
      let response = { client, parameter, habit };
      return res.json(response);
    }
    res.status(404).json({ error: 'Клиент не найден' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
