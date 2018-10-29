const express = require('express');
const router = express.Router();
const addressModule = require('../modules/address_module');

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

router.get('/:id', (req,res) => {
    const id =  req.params.id;
    addressModule.getAddressById(id).then(result => {
        res.status(200).send({id: id, address: result});
    }).catch(error => {
        res.status(200).send({"error": "ID inválido!"});
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

router.put('/:id', (req,res) => {
    const id = req.params.id;
    const newAddress = req.body;
    addressModule.updateAddress(id, newAddress).then(result => {
        res.status(200).send({old_value: result, new_value: newAddress});
    }).catch(error => {
        res.status(404).send({error: "ID inválido!"});
    });
});

router.delete('/:id', (req,res) => {
    const id = req.params.id;
    addressModule.deleteAddress(id).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        res.sendStatus(404);
    });
});

module.exports = router;