const router = require('express').Router();
const { Note } = require('../../db/models');

router.get('/', async (req, res) => {
  const notesByCategory = await Note.findAll({
    where: { categoryId: req.params.categoryId },
  });
  res.json(notesByCategory);
});

router.post('/', async (req, res) => {
  const newNote = await Note.create({
    ...req.body,
    categoryId: req.params.categoryId,
  });
  res.status(201).json(newNote);
});

router.get('/:id', async (req, res) => {
  const oneNote = await Note.findByPk(req.params.id);
  if (oneNote) {
    res.json(oneNote);
  } else {
    res.status(404).send('Заметка не найдена');
  }
});

router.put('/:id', async (req, res) => {
  const noteToUpdate = await Note.findByPk(req.params.id);
  if (noteToUpdate) {
    await noteToUpdate.update(req.body);
    res.json(noteToUpdate);
  } else {
    res.status(404).send('Заметка не найдена');
  }
});

router.delete('/:id', async (req, res) => {
  const noteToDelete = await Note.destroy({ where: { id: req.params.id } });
  if (noteToDelete) {
    res.status(204).send();
  } else {
    res.status(404).send('Заметка не найдена');
  }
});

module.exports = router;
