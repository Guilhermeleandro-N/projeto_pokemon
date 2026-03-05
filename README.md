# Projeto Pokémon - API + Frontend

Este projeto é dividido em duas partes:

- **server/** → Back-end da aplicação (Node.js + SQLite)
- **front/** → Front-end da aplicação (React)

---

# 1. Pré-requisitos

Antes de iniciar, é necessário ter instalado:

- Node.js (versão 18 ou superior recomendada)
- npm

Verifique se estão instalados:

```bash
node -v
npm -v
```

# 2. Clonar o projeto
```
git clone https://github.com/Guilhermeleandro-N/projeto_pokemon.git
cd projeto_pokemon
```
# 3. Rodando o Back-end
Entre na pasta server:
```bash
cd server
```
Instale as dependências:
```bash
npm install
```

Se der erro após o npm install:
```bash
npm audit fix
```
Inicie o servidor:
```bash
npm run dev
```
A API será iniciada em:

http://localhost:3000

O banco de dados SQLite será criado automaticamente no arquivo:

database.db
# 4. Rodando o Front-end

Abra outro terminal e entre na pasta front:
```bash
cd front
```
Instale as dependências:
```bash
npm install
```
Se der erro após o npm install:
```bash
npm audit fix
```

Inicie a aplicação React:
```bash
npm run dev
```
A aplicação será iniciada normalmente em:

http://localhost:5173
