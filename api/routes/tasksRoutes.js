const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.get('/tasks', (req, res) => {
    res.send(tasks);
  });

  // app.get('/tasks', requireLogin, (req, res) => {
  //   res.send(tasks);
  // });
};

const tasks = [
  { id: 1, taskName: 'Leanne Graham', description: 'dfabsdfbkak', anexos: [], priority: 2, submittedByUser: 'Joao' },
  { id: 2, taskName: 'Ervin Howell', description: 'dfabsdfbkak', anexos: [], priority: 2, submittedByUser: 'Joao' },
  { id: 3, taskName: 'Clementine Bauch', description: 'dfabsdfbkak', anexos: [], priority: 2, submittedByUser: 'Joao' },
  { id: 4, taskName: 'Patricia Lebsack', description: 'dfabsdfbkak', anexos: [], priority: 2, submittedByUser: 'Joao' },
  { id: 5, taskName: 'Chelsey Dietrich', description: 'dfabsdfbkak', anexos: [], priority: 2, submittedByUser: 'Joao' }
];