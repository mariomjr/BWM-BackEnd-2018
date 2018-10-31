const axios = require('axios');
const url = 'http://localhost:8080/user'

function getCpf(cpf) {
    return new Promise((resolve, reject) => {
        axios.get(url + `/${cpf}`).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        });
    });
}

module.exports = {getCpf};