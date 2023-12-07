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
      res.status(200).json({ error: 'Пользователь с таким login не найден' });
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
        name: user.name,
        email: user.email,
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
    setTimeout(() => {
      if (req.session.user) {
        const user = {
          login: req.session.user.login,
          email: req.session.user.email,
          name: req.session.user.name,
          isAdmin: req.session.user.isAdmin,
          id: req.session.user.id,
        };
        return res.json(user);
      }
      return res.json({
        login: '',
        email: '',
        name: '',
        id: '',
        isAdmin: false,
      });
    }, 2000);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при выходе из сессии' });
    }
    res.clearCookie('connect.sid');
    res.status(201).end();
  });
});

module.exports = router;
