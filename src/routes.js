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

import {
    registrarTreinador,
    loginTreinador,
    getTreinador,
    atualizarTreinador
} from './Controllers/TreinadorController.js';

import {
    listarTime,
    adicionarAoTime,
    removerDoTime
} from './Controllers/TimeController.js';


/**
 * ROTAS DE TREINADOR (Autenticação e Perfil)
 */
router.post('/treinador/registro', registrarTreinador);
router.post('/treinador/login', loginTreinador); // Para o React validar a entrada
router.get('/treinador/:id', getTreinador);     // Retorna perfil + time completo
router.put('/treinador/:id', atualizarTreinador);

/**
 * ROTAS DE TIME (Gestão da Equipe)
 */
router.get('/time/:treinador_id', listarTime);
router.post('/time', adicionarAoTime);         // Passa treinador_id e pokemon_id no body
router.delete('/time', removerDoTime);         // Passa os IDs para remover a relação


export default router;
