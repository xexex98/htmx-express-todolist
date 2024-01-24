const express = require('express');
let todo = require('../todo.cjs');

const router = express.Router();

function mapOrder(array, order, key) {
  var orderMap = {};
  for (var i = 0; i < order.length; i++) {
    orderMap[order[i]] = i;
  }
  array.sort((a, b) => {
    return orderMap[a[key]] - orderMap[b[key]];
  });
  return array;
}

router.get('/', async (req, res) => {
  await new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, 300);
  });
  res.render('_card', { todo });
});

router.post('/add', (req, res) => {
  const { new_task } = req.body;
  if (new_task) {
    todo.push({ id: Date.now(), name: new_task, status: 'start' });
  }
  res.render('_card', { todo });
});

router.post('/drag', (req, res) => {
  const order = req.body.items;
  const ordered = mapOrder(todo, order, 'id');
  res.render('_card', { todo: ordered });
});

router.delete('/delete/:id', (req, res) => {
  todo = todo.filter((item) => item.id !== Number(req.params.id));
  res.render('_card', { todo });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  todo = todo.map((item) => {
    if (item.id === Number(id)) {
      return { ...item, status: item.status === 'end' ? 'start' : 'end' };
    }
    return item;
  });
  res.render('_card', { todo });
});

module.exports = router;
