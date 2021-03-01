**_Net Promoter Score: Projeto Node.js criado seguindo a semana NLW#04 da Rocketseat._**
**Jerry Macedo Castro**
**jerry.castro96@outlook.com**

## Funcionamento

API para NPS ou Net Promoter Score. O NPS é uma métrica criada por _Fred Reichheld_ para medir a satisfação dos clientes, perguntando “de 0 a 10, o quanto você indicaria nossa empresa aos amigos?”

## Endpoints

- post '/user': Cria novo usuário
  > Exemplo de entrada: ` { "name": "nome de teste", "email": "3@1234.com" }`
- post '/survey': Cria nova pesquisa
  > Exemplo de entrada: `{"title": "React", "description": "De 0 a 10, quanto você gosta de react?"}`
- get /survey': Retorna todas pesquisas
  > Nenhuma entrada necessária
- post '/sendmail': Monta um e-mail e simula o envio
  > Exemplo de entrada: `{"email": "2@1234.com", "survey_id": "ad0efa23-85a4-4cb6-92f3-8481fd37246a"}`
- get /answers/:value?U=SurveysUsers_id': Confere nota do cliente a pesquisa
  > Nenhuma entrada necessária
- get /nps/:survey_id': Resgata o calculo de NPS geral
  > Nenhuma entrada necessária

## Tecnologias Utilizadas

> Node JS, Typescript, Sqlite3, express, jest, handlebars,nodemailer, typeorm, uuid

## Iniciando o desenvolvimento

Primeiro, faça o clone do repositório e instale as dependências:

```bash
npm install
# or
yarn
```

Agora, rode o projeto no ambiente de desenvolvimento:

```bash
npm run dev
# or
yarn dev
```

Utilize url padrão (http://localhost:3333/) para testar os endpoints.

Realizar os testes de integração:

```bash
yarn test
# or
npm run test
```
