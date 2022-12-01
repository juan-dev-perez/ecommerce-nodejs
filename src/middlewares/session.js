const session = require('express-session');
const connectMongo = require('connect-mongo');
const NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${NODE_ENV}` });

const sesion = session({
    store: connectMongo.create({
      mongoUrl: process.env.URLDB,
      mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
      ttl: process.env.TIMESPIRACION
    }),
    secret: process.env.SECRETDB,
    resave: false,
    saveUninitialized: false
})

module.exports = sesion;