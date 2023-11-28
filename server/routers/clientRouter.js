const express = require('express');
const { Client, Parameter, Task} = require('../db/models');

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


// router.get('/param', async (req, res) => {
//   try {
//     const { weight, chest, waist, hips, BMI, clientId } = req.query;
//     const allParameters = await Parameter.findAll({
//       include: Parameter,
//     });
//     console.log('LLLLLLLLL')
//     res.json(allParameters);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Ошибка сервера' });
//   }
// });

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
    const parametr = await Parameter.findOne({where: clientId === id})
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


module.exports = router;
