const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const express = require('express');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const usersRouter = require('./controllers/users');
const proveedoresRouter = require('./controllers/proveedores');
const rutasRouter = require('./controllers/rutas');
const pasajerosRouter = require('./controllers/pasajeros');
const boletosRouter = require('./controllers/boletos');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { verificarAutenticacion } = require('./middleware/auth');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_TEST);
    console.log('Te has conectado a MongoDB');
    mongoose.set('debug', true);
  } catch (error) {
    console.log(error);
  }
})();

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

// Rutas frontend
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/registro', express.static(path.resolve('views', 'register')));
app.use('/componentes', express.static(path.resolve('views', 'componentes')));
app.use('/img', express.static(path.resolve('img')));
app.use('/admon', express.static(path.resolve('views', 'adminPanel')));
app.use('/res', express.static(path.resolve('views', 'resultado')));
app.use('/seat', express.static(path.resolve('views', 'bus')));
app.use('/proveedor', express.static(path.resolve('views', 'proveedores')));
app.use('/confirmar', express.static(path.resolve('views', 'confirmacion')));
app.use('/rutas', express.static(path.resolve('views', 'rutas')));

// IMPORTANTE
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('tiny'));

// Rutas backend
app.use('/api/users', usersRouter);
app.use('/api/proveedores', proveedoresRouter);
app.use('/api/rutas', rutasRouter);
app.use('/api/pasajeros', pasajerosRouter);
app.use('/api/boletos', boletosRouter);



module.exports = app;
