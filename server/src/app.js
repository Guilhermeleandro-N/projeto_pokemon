import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { createTable } from './Controllers/PokemonController.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(cors());

import router from './routes.js';
app.use(router);

createTable();

app.listen(3000, () => console.log("API rodando em http://localhost:3000"));
