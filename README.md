# BookAPI V1

API REST simples em Node.js para gerenciar um catálogo de livros com MongoDB.

## Requisitos
- Node.js 18+
- MongoDB em execução (local ou hospedado)

## Configuração rápida
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo `.env` (opcional) para sobrescrever as variáveis abaixo:
   ```env
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/bookdb_v1
   ```
3. Inicie o servidor em modo desenvolvimento:
   ```bash
   npm run dev
   ```

## Estrutura principal
- `src/app.js`: configuração do Express e middlewares.
- `src/server.js`: bootstrap da aplicação e conexão com o MongoDB.
- `src/routes/books.js`: rotas REST para CRUD e filtros de livros.
- `src/models/Book.js`: schema Mongoose para os documentos de livros.

## Endpoints base
A API responde a partir de `/bookapi/v1/book` para as operações de CRUD e buscas.
