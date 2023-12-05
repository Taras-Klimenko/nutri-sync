const express = require('express');

const router = express.Router();
const { Parameter} = require('../../db/models');

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const parameters = await Parameter.findAll({
            where: { clientId: id },
            order: [['createdAt', 'DESC']],
            raw: true,
        });
        if (!parameters) {
            res.status(200).json({ error: 'Нет параметров.' });
        }

        res.status(200).json(parameters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { height, weight, chest, waist, hips, BMI } = req.body;
        const newParameter = await Parameter.create({
            clientId: id,
            height,
            weight,
            chest,
            waist,
            hips,
            BMI,
        });

        res.status(200).json(newParameter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedStata = await Parameter.findByPk(id);

        if (!updatedStata) {
            return res.status(404).json({ message: 'Статистика не найдена' });
        }

        const { height, weight, chest, waist, hips, BMI } = req.body;

        await Parameter.update(
            {
                height,
                weight,
                chest,
                waist,
                hips,
                BMI,
                updatedAt: new Date(), // Добавлено обновление времени
            },
            {
                where: { id: id },
            }
        );

        res.status(200).json({ message: 'Статистика успешно обновлена' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Произошла ошибка при обновлении статистики' });
    }
});


router.delete('/update/:id', async (req, res) => {
    try {
        await Parameter.destroy({ where: { id: req.params.id } });
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ ошибка: `${error}` });
    }
});

module.exports = router;
