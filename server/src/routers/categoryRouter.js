const router = require('express').Router();
const { Category, Note } = require('../../db/models');

router.post('/', async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.status(201).json(newCategory);
});

router.get('/', async (req, res) => {
  const allCategories = await Category.findAll();
  res.json(allCategories);
});

router.get('/:id', async (req, res) => {
  const oneCategory = await Category.findByPk(req.params.id);
  if (oneCategory) {
    res.json(oneCategory);
  } else {
    res.status(404).send('Блокнот не найден');
  }
});

router.put('/:id', async (req, res) => {
  const categoryToUpdate = await Category.findByPk(req.params.id);
  if (categoryToUpdate) {
    await categoryToUpdate.update(req.body);
    res.json(categoryToUpdate);
  } else {
    res.status(404).send('Блокнот не найден');
  }
});

router.delete('/:id', async (req, res) => {
  const categoryToDelete = await Category.destroy({
    where: { id: req.params.id },
  });
  if (categoryToDelete) {
    res.status(204).send();
  } else {
    res.status(404).send('Блокнот не найден');
  }
});

router.get('/:categoryId/notes', async (req, res) => {
  const notesByCategory = await Note.findAll({
    where: { categoryId: req.params.categoryId },
  });
  res.json(notesByCategory);
});

router.post('/:categoryId/notes', async (req, res) => {
  const newNote = await Note.create({
    ...req.body,
    categoryId: req.params.categoryId,
  });
  res.status(201).json(newNote);
});

router.get('/notes/:id', async (req, res) => {
  const oneNote = await Note.findByPk(req.params.id);
  if (oneNote) {
    res.json(oneNote);
  } else {
    res.status(404).send('Заметка не найдена');
  }
});

router.put('/notes/:id', async (req, res) => {
  const noteToUpdate = await Note.findByPk(req.params.id);
  if (noteToUpdate) {
    await noteToUpdate.update(req.body);
    res.json(noteToUpdate);
  } else {
    res.status(404).send('Заметка не найдена');
  }
});

router.delete('/notes/:id', async (req, res) => {
  const noteToDelete = await Note.destroy({ where: { id: req.params.id } });
  if (noteToDelete) {
    res.status(204).send();
  } else {
    res.status(404).send('Заметка не найдена');
  }
});

module.exports = router;
