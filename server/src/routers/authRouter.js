const express = require('express');
const bcrypt = require('bcrypt');
const { Curator } = require('../../db/models');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await Curator.findOne({
      where: { login },
      raw: true,
    });

    if (user === null) {
      res
        .status(200)
        .json({ error: 'Пользователя с таким login не найден.' });
      return;
    }

    const checkPassword = await bcrypt.compare(password, user?.password);

    if (checkPassword) {
      req.session.user = {
        id: user.id,
        login: user.login,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      };

      res.status(201).json({
        id: user.id,
        login: user.login,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      });
      return;
    }

    res.status(200).json({ error: 'Неправильный пароль' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/reg', async (req, res) => {
  try {
    // if (req.session?.user?.isAdmin === false) {
    //   res.status(200).json({
    //     error: 'Только администратор может создавать новые учётные записи.',
    //   });
    // }

    const { login, name, email, password } = req.body;

    if (!name || !email || !password || !login) {
      res.status(200).json({ error: 'Заполните все поля' });
      return;
    }

    const existingCuratorLogin = await Curator.findOne({ where: { login } });
    if (existingCuratorLogin) {
      res.status(200).json({ error: 'Это имя пользователя уже занято.' });
      return;
    }

    const existingCuratorEmail = await Curator.findOne({ where: { email } });
    if (existingCuratorEmail) {
      res
        .status(200)
        .json({ error: 'Этот адрес электронной почты уже занят.' });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await Curator.create({
      login,
      name,
      email,
      password: hash,
    });

    req.session.user = {
      id: user.id,
      login: user.login,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    };

    res.status(201).json({
      id: user.id,
      login: user.login,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/check', (req, res) => {
  try {
    if (req.session.user) {
      const user = {
        id: req.session.user.id,
        login: req.session.user.login,
        email: req.session.user.email,
        name: req.session.user.name,
        isAdmin: req.session.user.isAdmin,
      };
      return res.json(user);
    }
    return res.json(null);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при выходе из сессии' });
    }
    res.clearCookie('connect.sid');
    res.status(201).json({ message: 'Вы успешно вышли из сессии' });
  });
});

module.exports = router;
