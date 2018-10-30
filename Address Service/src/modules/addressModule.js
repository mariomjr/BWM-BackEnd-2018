const db = require('../db_conn');
const userModule = require('./usersModule');

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

function getAddressByCpf(cpf) {
    return new Promise((resolve, reject) => {
        const Addresses = db.Mongoose.model('addressCollection', db.AddressSchema);
        Addresses.find({cpf: cpf}).lean().exec((e, docs) => {
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
        if(!data.cpf) {
            reject("Informe um CPF!");
            return;
        }
        userModule.getCpf(data.cpf).then(user => {
            if(!user.data) {
                reject("CPF não encontrado na base de usuários.");
                return;
            }
            this.getAddressByCpf(user.data.cpf).then(result => {
                if(result && result.length > 0) {
                    reject("Apenas 1 CPF por usuário é permitido.");
                    return;
                } 
                const Addresses = db.Mongoose.model('addressCollection', db.AddressSchema);
                const newAddress = new Addresses({
                    cpf: data.cpf,
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
        });
    });
}

function updateAddress(cpf, data) {
    return new Promise((resolve, reject) => {
        const Addresses = db.Mongoose.model('addressCollection', db.AddressSchema);
        Addresses.find({cpf: cpf}).lean().exec((error, docs) => {
            if(error || docs.length === 0) {
                reject("Endereço não encontrado. Verifique o CPF");
                return;
            }
            const id = docs[0]._id;
            Addresses.findByIdAndUpdate(id, {
                cpf: data.cpf,
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
    });
}

function deleteAddress(cpf) {
    return new Promise((resolve, reject) => {
        const Addresses = db.Mongoose.model('addressCollection', db.AddressSchema);
        Addresses.find({cpf: cpf}).lean().exec((error, docs) => {
            if(error || docs.length === 0) {
                reject("Endereço não encontrado. Verifique o CPF");
                return;
            }
            const id = docs[0]._id;
            Addresses.findByIdAndDelete(id, (error, doc) => {
                if(error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    });
}

module.exports = {getAllAddresses, getAddressByCpf, createNewAddress, updateAddress, deleteAddress};