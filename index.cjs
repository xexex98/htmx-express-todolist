const express = require('express');
const app = express();

const todos = require('./routes/todos.cjs');
const index = require('./routes/index.cjs');

app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.use(express.static('public'));

app.use('/', index);
app.use('/todos', todos);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server start on port: ', PORT));
