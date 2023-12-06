const express = require('express');
const { Task } = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todos = await Task.findAll({
      order: [['isCompleted', 'ASC']],
    });

    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const todo = await Task.findByPk(req.params.id);
  res.json(todo);
});

router.post('/', async (req, res) => {
  const todo = await Task.create(req.body);
  res.json(todo);
});

router.patch('/:id', async (req, res) => {
  const todo = await Task.findByPk(req.params.id);
  await todo.update(req.body);
  res.json(todo);
});

router.delete('/:id', async (req, res) => {
  await Task.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
});

module.exports = router;
