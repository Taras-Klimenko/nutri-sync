const router = require('express').Router();
const { Habit } = require('../db/models');

router.post('/', async (req, res) => {
  try {
    const { title, isCompleted, clientId } = req.body;
    const newHabit = await Habit.create({
      title,
      isCompleted,
      clientId,
    });
    // console.log(typeof clientId, "OOOOOOOOOOOOOOOO")
    res.status(201).json(newHabit);
  } catch (error) {
    console.error('Ошибка при создании новой привычки', error);
    res.status(500).json({ error: 'Ошибка ошибок' });
  }
});

router.put('/:id', async (req, res) => {
  const habitUpdate = await Habit.findByPk(req.params.id);
  if (habitUpdate) {
    await habitUpdate.update(req.body);
    //  console.log(req.body, 'iiiii');
    res.json(habitUpdate);
  } else {
    res.status(404).send('Привычка не найдена');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const habit = await Habit.findByPk(req.params.id);
    // console.log(habit, 'hhhhhhhhhhhhhhhhhhh');
    if (!habit) {
      return res.status(404).send('Привычка не найдена');
    }
    await habit.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Ошибка сервера');
  }
});
module.exports = router;
