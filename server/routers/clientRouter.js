const express = require('express');

const { Client, Parameter, Curator, Task, Habit } = require('../db/models');

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
router.get('/curator/:id', async (req, res) => {
  const curatorId = req.params.id;
  try {
    const client = await Client.findAll({
      where: { curatorId: curatorId }, // Уточните, как поле curatorId представлено в вашей модели Client
      include: { model: Curator },
    });
    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ошибка: `${error}` });
  }
});

const standardHabits = [
  { title: 'Ведение дневника питания', isCompleted: false },
  { title: 'Навыки осознанного питания', isCompleted: false },
  { title: 'Достаточное количество овощей и фруктов', isCompleted: false },
  { title: 'Наличие в рационе всех пищевых групп', isCompleted: false },
  { title: 'Наличие основных приемов пищи', isCompleted: false },
  { title: 'Носить перекус с собой', isCompleted: false },
  { title: 'Промежутки между едой 3-4 часа', isCompleted: false },
  { title: 'Минимальное количество животных жиров', isCompleted: false },
  { title: 'Минимальное количество добавленного сахара', isCompleted: false },
  { title: 'Достаточное количество воды', isCompleted: false },
  { title: 'Хороший и достаточный сон', isCompleted: false },
  { title: 'Необходимое количество порций ежедневно', isCompleted: false },
  { title: 'Контроль размера порций', isCompleted: false },
  { title: 'Оставлять лишнее на тарелке', isCompleted: false },
  { title: 'Правильное питание в ситуациях, когда раньше переедал(а)',
  isCompleted: false,
  },
  { title: 'Просьба о поддержке и получение поддержки', isCompleted: false },
  { title: 'Извлечение уроков из срывов', isCompleted: false },
  { title: 'Различение голода и аппетита', isCompleted: false },
];

async function createStandardHabitsForCLient(clientId) {
  for (const habit of standardHabits) {
    await Habit.create({ ...habit, clientId });
  }
}

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, birthday, paidTill, phoneNumber, curatorId } =
      req.body;
    const client = await Client.create({
      firstName,
      lastName,
      birthday,
      paidTill,
      phoneNumber,
      curatorId,
    });
    await createStandardHabitsForCLient(client.id);
    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ошибка: `${error}` });
  }
});

router.patch('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(200).json({ сообщение: 'Клиент не найден' });
    }

    const { firstName, lastName, birthday, paidTill, phoneNumber, curatorId } =
      req.body;
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
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: 'Client ID is missing in the request' });
      return;
    }
    const client = await Client.findByPk(id);
    const parameter = await Parameter.findOne({ where: { clientId: id } });
    const habit = await Habit.findAll({ where: { clientId: id } });
    if (client) {
      const response = { client, parameter, habit };
      return res.json(response);
    }
    res.status(404).json({ error: 'Клиент не найден' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
