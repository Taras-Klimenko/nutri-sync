const router = require('express').Router();
const { Habit } = require('../db/models');

router.put('/:id', async (req, res) => {
  const habitUpdate = await Habit.findByPk(req.params.id);
  console.log(habitUpdate)
  if (habitUpdate) {
    await habitUpdate.update(req.body);
    console.log(req.body, 'iiiii')
    res.json(habitUpdate);
  } else {
    res.status(404).send('Привычка не найдена');
  }
});

module.exports = router;