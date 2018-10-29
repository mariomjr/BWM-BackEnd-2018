const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const allowCors = require('./cors');
const queryParser = require('express-query-int');
const addressRouter = require('./routes_modules/address');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors);
server.use(queryParser());
server.use('/enderecos', addressRouter);

server.listen(3000, () => console.log('Executando em http://localhost:3000'))