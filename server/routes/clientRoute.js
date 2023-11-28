const express = require('express');

const {Client, Task} = require('../db/models');

const route = express.Router();


route.get('/', async (req, res) => {
    try {
        const clients = await Client.findAll({
            raw: true,
        });
        res.json(clients);
    } catch (error) {
        console.error(`Ошибка homeRoutes /: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' }); // Отправляем ошибку сервера в формате JSON
    }
});

route.get('/task', async (req, res) => {
    try {
        const tasks = await Task.findAll({
            raw: true,
        });
        res.json(tasks);
        console.log(tasks)
    } catch (error) {
        console.error(`Ошибка homeRoutes /: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' }); // Отправляем ошибку сервера в формате JSON
    }
});


module.exports = route;
