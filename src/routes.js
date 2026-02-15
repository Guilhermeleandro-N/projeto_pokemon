import { Router } from 'express';

import {
    createTable,
    selectPokemons,
    selectPokemon,
    insertPokemon,
    updatePokemon,
    deletePokemon
} from './Controllers/PokemonController.js';

const router = Router();

//////////////////////////////////////////////////
// CREATE TABLE
//////////////////////////////////////////////////

router.get('/create-table', createTable);

//////////////////////////////////////////////////
// CRUD
//////////////////////////////////////////////////

// Listar todos ou buscar por nome
router.get('/', selectPokemons);

// Buscar por ID
router.get('/:id', selectPokemon);

// Inserir
router.post('/', insertPokemon);

// Atualizar
router.put('/:id', updatePokemon);

// Deletar
router.delete('/:id', deletePokemon);

export default router;
