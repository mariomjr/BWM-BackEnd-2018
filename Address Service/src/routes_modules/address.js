const express = require('express');
const router = express.Router();
const addressModule = require('../modules/addressModule');

router.use((req, res, next) => {
    next();
});

router.get('/', (req,res) => {
    addressModule.getAllAddresses().then(result => {
        res.status(200).send(result);
    }).catch(error => {
        res.status(404).send({"error": error});
    });
});

router.get('/:cpf', (req,res) => {
    const cpf =  req.params.cpf;
    addressModule.getAddressByCpf(cpf).then(result => {
        res.status(200).send({cpf: cpf, address: result});
    }).catch(error => {
        res.status(200).send({"error": "CPF inválido!"});
    });
});

router.post('/', (req,res) => {
    const newAddress = req.body;
    addressModule.createNewAddress(newAddress).then(() => {
        res.sendStatus(201);
    }).catch(error => {
        res.status(404).send({"error": error});
    });
});

router.put('/:cpf', (req,res) => {
    const cpf = req.params.cpf;
    const newAddress = req.body;
    addressModule.updateAddress(cpf, newAddress).then(result => {
        res.status(200).send({old_value: result, new_value: newAddress});
    }).catch(error => {
        res.status(404).send({error: error});
    });
});

router.delete('/:cpf', (req,res) => {
    const cpf = req.params.cpf;
    addressModule.deleteAddress(cpf).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        res.status(404).send({error: error});
    });
});

module.exports = router;