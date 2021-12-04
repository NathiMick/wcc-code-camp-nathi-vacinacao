# DOCUMENTAÇÃO

[Documentação em Swagger](https://wcc-code-camp-nathi-vacinacao.herokuapp.com/api-docs/)

```jsx
API REST NodeJS para controle de vacinação WCC
Versão 1.0.0 

Descrição: Projeto desafio WCC Dasa para criação de um controle de vacinação

ROTAS: users

POST
/users/newUser
Cadastro de Usuários

GET
/users
Descrição: Retorna todos os usuários cadastrados no banco de dados

GET
/users/{id}
Descrição: Busca um usuário pelo Id utilizando o params (path)

PUT
/users/updateUser/{id}
Descrição: Atualizar usuário (apenas o nome e CPF), buscando pelo ID do usuário no params (path). IMPORTANTE: Cso o CPF não seja o mesmo do usuário já cadastrado, não será aceito

DELETE
/users/deleteUser/{id}
Descrição: Deletar um usuário, buscando pelo ID e utilizando o params (path)

PATCH
/users/includeUserVaccines/{id}
Descrição: Incluir vacina préviamente cadastrada no Banco de Dados de Vacina (Vaccines) no cadastro do usuário, utilizando o params (path) para encontrar o Usuário

DELETE
/users/excludeUserVaccines/{id}
Descrição: Excluir vacina préviamente cadastrada no Banco de Dados de Vacina (Vaccines) do cadastro do usuário, utilizando o params (path) para encontrar o Usuário

ROTAS: Vaccines

POST
/vaccines/
Descrição: Cadastro de Vacinas existentes

GET
/vaccines/
Descrição: Retorna todas as vacinas cadastradas no Banco de Dados

GET
/vaccines/{id}
Descrição: Busca uma vacina cadastrada pelo Id utilizando o params (path)

PUT
/vaccines/{id}
Descrição: Atualizar Vacina (apenas o Name e Expected date), utilizando o params ID (path) para encontrar a Vacina

DELETE
/vaccines/{id}
Descrição: Deleta uma vacina cadastrada pelo Id utilizando o params (path)

PATCH
/vaccines/{id}/vaccinated
Descrição: Atualiza o status da vacina, informando se o usuário está vacinado ou não, buscando pelo ID da vacina no params (path)
```