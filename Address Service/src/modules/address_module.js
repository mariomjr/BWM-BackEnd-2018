const db = require('../db_conn');

function getAllAddresses() {
    return new Promise((resolve, reject) => {
        const Addresses = db.Mongoose.model('addressCollection', db.AddressSchema);
        Addresses.find({}).lean().exec((e, docs) => {
            if(e) {
                console.log(e);
                reject(e);
            } else {
                resolve(docs);
            }
        });
    });
}

function getAddressById(id) {
    return new Promise((resolve, reject) => {
        const Addresses = db.Mongoose.model('addressCollection', db.AddressSchema);
        Addresses.find({_id: id}).lean().exec((e, docs) => {
            if(e) {
                reject(e);
            } else {
                resolve(docs);
            }
        });
    });
}

function createNewAddress(data) {
    return new Promise((resolve, reject) => {
        const Addresses = db.Mongoose.model('addressCollection', db.AddressSchema);
        const newAddress = new Addresses({
            cep: data.cep,
            rua: data.rua,
            bairro: data.bairro,
            complemento: data.complemento,
            cidade: data.cidade,
            estado: data.estado,
            pais: data.pais
        });
        newAddress.save((error) => {
            if(error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

function updateAddress(id, data) {
    return new Promise((resolve, reject) => {
        const Addresses = db.Mongoose.model('addressCollection', db.AddressSchema);
        Addresses.findByIdAndUpdate(id, {
            cep: data.cep,
            rua: data.rua,
            bairro: data.bairro,
            complemento: data.complemento,
            cidade: data.cidade,
            estado: data.estado,
            pais: data.pais
        }, (error, doc) => {
            if(error) {
                reject(error);
            } else {
                resolve(doc);
            }
        });
    });
}

function deleteAddress(id) {
    return new Promise((resolve, reject) => {
        const Addresses = db.Mongoose.model('addressCollection', db.AddressSchema);
        Addresses.findByIdAndDelete(id, (error, doc) => {
            if(error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {getAllAddresses, getAddressById, createNewAddress, updateAddress, deleteAddress};