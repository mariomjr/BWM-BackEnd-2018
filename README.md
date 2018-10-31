# BWM-BackEnd-2018
Sistemas para integração via REST entre as aplicações.

## Projeto User
- Banco necessário PostgresSql (https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- Importe o projeto Maven Projects(Spring Tools Suite ou Eclipse)
- Rode a classe UserApplication.java

Obs.: O postgresSql deve estar configurado com o usuário e senha "postgres" e porta 5432.

Irá gerar a tabela no Postgres
Insira uma linha para consulta 

'insert into users(id,cpf, email, nome, telefone) values (1, 'numeroCpf','mariohj94@gmail.com', 'Mario', 'telefone');'

No browser ou Postman acesse a URL:
http://localhost:8080/user/

User
```javascript
{
 nome: String,
 cpf: String,
 telefone: String,
 email: String
}
```
### GET
`/user` => retorna lista de usuários.

`/user/:cpf` => retorna um usuário e o endereço associado (caso exista).

### POST
`/user` => Cria um novo usuário. Enviar no request body um json com o objeto User.

## Projeto Address Service
#### Pré requisitos
- MongoDB rodando localmente.
- NodeJS instalado.

#### Execução
Execute o comando `$ npm install` na raiz

Execute o arquivo `index.js`


O servidor estará disponível no endereço:
http://localhost:3000/enderecos

Endereço
```javascript
{
  cpf: string,
  cep: string, 
  rua: string, 
  bairro: string, 
  complemento: string,
  cidade: string,
  estado: string, 
  pais: string
}
```

### GET
`/enderecos` => retorna lista de endereços.

`/enderecos/:cpf` => retorna endereço associado a um cpf.

### POST
`/enderecos` => Cria um novo endereço baseado no cpf. Enviar no request body um json com o objeto Endereço. 

### PUT
`/enderecos/:cpf` => Edita um endereço baseado no cpf. Enviar no request body um json o objeto Endereço.

### DELETE
`/enderecos/:cpf` => Exclui um endereço da base baseado no cpf.
