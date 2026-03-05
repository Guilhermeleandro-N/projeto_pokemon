import { openDb } from '../configDB.js';

//////////////////////////////////////////////////
// CREATE TABLE
//////////////////////////////////////////////////

export async function createTable() {
    const db = await openDb();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS Pokemon (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            numero_pokedex INTEGER NOT NULL,
            imagem TEXT NOT NULL,
            peso REAL NOT NULL,
            tipo TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS Treinadores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        senha TEXT NOT NULL,
        sexo TEXT NOT NULL,
        pokemon_favorito TEXT NOT NULL,
        regiao TEXT NOT NULL
);
    `);
}


//////////////////////////////////////////////////
// SELECT TODOS
//////////////////////////////////////////////////

export async function selectPokemons(req, res) {
    const { nome } = req.query;
    const db = await openDb();

    let pokemons;

    if (nome) {
        pokemons = await db.all(
            'SELECT * FROM Pokemon WHERE nome LIKE ?',
            [`%${nome}%`]
        );
    } else {
        pokemons = await db.all('SELECT * FROM Pokemon');
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const pokemonsComImagem = pokemons.map(pokemon => ({
        ...pokemon,
        imagem: `${baseUrl}${pokemon.imagem}`
    }));

    res.json(pokemonsComImagem);
}

//////////////////////////////////////////////////
// SELECT POR ID
//////////////////////////////////////////////////

export async function selectPokemon(req, res) {
    const { id } = req.params;
    const db = await openDb();

    const pokemon = await db.get(
        'SELECT * FROM Pokemon WHERE id=?',
        [id]
    );

    if (!pokemon) {
        return res.status(404).json({ message: "Pokemon não encontrado" });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    res.json({
        ...pokemon,
        imagem: `${baseUrl}${pokemon.imagem}`
    });
}

//////////////////////////////////////////////////
// INSERT
//////////////////////////////////////////////////

export async function insertPokemon(req, res) {
    try {
        const db = await openDb();
        const dados = req.body;

        // 🔥 Se for array
        if (Array.isArray(dados)) {

            for (const pokemon of dados) {

                const imagemPath = `/images/${pokemon.nome}.png`;

                await db.run(
                    `INSERT INTO Pokemon 
                    (nome, numero_pokedex, imagem, peso, tipo) 
                    VALUES (?,?,?,?,?)`,
                    [
                        pokemon.nome,
                        pokemon.numero_pokedex,
                        imagemPath,
                        pokemon.peso,
                        pokemon.tipo
                    ]
                );
            }

            return res.status(201).json({
                message: "Pokemons inseridos com sucesso"
            });
        }

        // 🔥 Se for apenas um objeto
        const imagemPath = `/images/${dados.nome}.png`;

        await db.run(
            `INSERT INTO Pokemon 
            (nome, numero_pokedex, imagem, peso, tipo) 
            VALUES (?,?,?,?,?)`,
            [
                dados.nome,
                dados.numero_pokedex,
                imagemPath,
                dados.peso,
                dados.tipo
            ]
        );

        res.status(201).json({
            message: "Pokemon inserido com sucesso"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//////////////////////////////////////////////////
// UPDATE
//////////////////////////////////////////////////

export async function updatePokemon(req, res) {
    try {
        const { id } = req.params;
        const pokemon = req.body;
        const db = await openDb();

        const imagemPath = `/images/${pokemon.nome}.png`;

        await db.run(
            `UPDATE Pokemon 
             SET nome=?, numero_pokedex=?, imagem=?, peso=?, tipo=? 
             WHERE id=?`,
            [
                pokemon.nome,
                pokemon.numero_pokedex,
                imagemPath,
                pokemon.peso,
                pokemon.tipo,
                id
            ]
        );

        res.json({
            message: "Pokemon atualizado com sucesso"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//////////////////////////////////////////////////
// DELETE
//////////////////////////////////////////////////

export async function deletePokemon(req, res) {
    const { id } = req.params;
    const db = await openDb();

    await db.run('DELETE FROM Pokemon WHERE id=?', [id]);

    res.status(200).json({
        message: "Pokemon deletado com sucesso"
    });
}
