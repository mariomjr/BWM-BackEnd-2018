# BWM-BackEnd-2018
Sistemas para integração via REST entre as aplicações.

## Projeto User
- Banco necessário PostgresSql (https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- Importe o projeto Maven Projects(Spring Tools Suite ou Eclipse)
- Rode a classe UserApplication.java

Irá gerar a tabela no Postgres
Insira uma linha para consulta 

'insert into users(id,cpf, email, nome, telefone) values (1, 'numeroCpf','mariohj94@gmail.com', 'Mario', 'telefone');'

No browser ou Postman via Get acesse a URL:
http://localhost:8080/user/numeroCpf


## Projeto Address Service
#### Pré requisitos
- MongoDB rodando localmente.
- NodeJS instalado.

#### Execução
Execute o comando `$ npm install` na raiz

Execute o arquivo `index.js`


O servidor estará disponível no endereço:
http://localhost:3000/enderecos
