
//conxões
require('dotenv').config({ path: 'variables.env'})
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');

// rotas
var indexRouter = require('./routes/index');
var tasksRoutes = require('./routes/tasksRoutes');

//conexao com BD
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (eror) => {
    console.error("ERRO " + error.message);
});

let bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/tasks', tasksRoutes);

//porta
app.listen(process.env.PORT, ()=> {
    console.log(`Servidor Rodando na porta: ${process.env.PORT}`);
})

module.exports = app;
