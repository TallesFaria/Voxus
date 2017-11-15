const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/xss', (req, res) => {
    res.send(usersXss);
  });

  app.get('/admins', requireLogin, (req, res) => {
    res.send(admins);
  });
};

const users = [
  { id: 1, name: 'Leanne Graham' },
  { id: 2, name: 'Ervin Howell' },
  { id: 3, name: 'Clementine Bauch' },
  { id: 4, name: 'Patricia Lebsack' },
  { id: 5, name: 'Chelsey Dietrich' }
];