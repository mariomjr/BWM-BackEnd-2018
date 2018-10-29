const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/address_db');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const addressSchema = new mongoose.Schema({
    cep: String,
    rua: String,
    bairro: String,
    complemento: String,
    cidade: String,
    estado: String,
    pais: String
}, { collection: 'addressCollection' });

module.exports = { Mongoose: mongoose, AddressSchema: addressSchema }