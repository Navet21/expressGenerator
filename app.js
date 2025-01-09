// === Instancias ===
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Rutas importadas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// === Configuraciones ===
// Configuración del motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// === Middleware ===
app.use(logger('dev')); // Logger para registrar solicitudes
app.use(express.json()); // Analizador JSON para el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: false })); // Analizador de URL codificadas
app.use(cookieParser()); // Analizador de cookies
app.use(express.static(path.join(__dirname, 'public'))); // Middleware para archivos estáticos

// === Rutas ===
app.use('/', indexRouter); // Ruta principal
app.use('/users', usersRouter); // Ruta para usuarios

// === Manejadores de errores ===
// Captura errores 404 y los pasa al manejador de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  // Configura las variables locales, solo proporcionando error en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza la página de error
  res.status(err.status || 500);
  res.render('error');
});

// === Arranque del servidor o exportación del servidor ===
module.exports = app; // Exporta la aplicación para que `bin/www` o cualquier otro archivo pueda usarla
