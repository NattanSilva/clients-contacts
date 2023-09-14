# 📘 Cotacts API

Esta API foi criada utilizando o modelo REST vizando um CRUD(Create Read Update Delete) de contatos e usuários atarvés das rotas listadas nesta documentação.

## Tecnologias utlizadas

- NodeJs
- Typescript
- Express
- TypeORM
- Jest
- Supertest
- Ts-node-dev
- Bcryptjs
- Dotenv
- Express async errors
- Jsonwebtoken

## Banco de dados

- SQLite3
- PostgreSQL

## Configurações

Para utilizar esta API basta clonar este repositório, navegar ate a pasta **beck** e seguir os passos indicados abaixo.

1. Instalar as dependências necessárias:

```
  yarn install ou npm install
```

2. Copiar o arquivo `.env.example` na raiz do projeto, renomea-lo para `.env` e preencher as informações do seu banco de dados PostgreSQL local nas variáveis de ambiente contidas no arquivo.
   
3. Gerar as migrações do TypeORM com o comando:

```
  yarn typeorm migration:generate ./src/migrations/createUsers -- -d ./src/data-source.ts
```

4. Execetuar a criação das tabelas no seu banco de dados PostgreSQL com o comando:

```
  yarn typeorm migration:run -- -d ./src/data-source
```

5. Inicializar a execução do projeto utilizando os comandos abaixo:

```
  yarn dev ou npm run dev
```

6. Para rodar os testes de integração utilize o comando `yarn test`.

## Documentação

A documentação deste projeto esta contida no arquivo `insomnia-documentation.json` , para usá-la bast realizar a <a href="https://www.ibm.com/docs/pt-br/scbn?topic=documentation-setting-up-your-insomnia-workspace" target="_blank">importação</a> do arquivo no seu Insomnia local, iniciar a API e testar as rotas. Neste documento também estão contidos as especificações do body requerido em cada rota.
