import { openDb } from '../configDB.js';

export async function registrarTreinador(req, res) {
    const { nome, senha, sexo, pokemon_favorito_id, regiao } = req.body;
    const db = await openDb();
    try {
        await db.run(
            `INSERT INTO Treinadores (nome, senha, sexo, pokemon_favorito_id, regiao) VALUES (?,?,?,?,?)`,
            [nome, senha, sexo, pokemon_favorito_id, regiao]
        );
        res.status(201).json({ message: "Treinador cadastrado!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function loginTreinador(req, res) {
    const { nome, senha } = req.body;
    const db = await openDb();
    const treinador = await db.get('SELECT * FROM Treinadores WHERE nome=? AND senha=?', [nome, senha]);
    if (treinador) res.json(treinador);
    else res.status(401).json({ message: "Credenciais inválidas" });
}

export async function getTreinador(req, res) {
    const { id } = req.params;
    const db = await openDb();
    const treinador = await db.get('SELECT * FROM Treinadores WHERE id=?', [id]);
    if (!treinador) return res.status(404).json({ message: "Não encontrado" });
    
    const time = await db.all(`
        SELECT p.* FROM Pokemon p 
        JOIN Times t ON p.id = t.pokemon_id 
        WHERE t.treinador_id = ?`, [id]);
        
    res.json({ ...treinador, time });
}

export async function atualizarTreinador(req, res) {
    const { id } = req.params;
    const { nome, sexo, regiao, pokemon_favorito_id } = req.body;
    const db = await openDb();
    await db.run(
        `UPDATE Treinadores SET nome=?, sexo=?, regiao=?, pokemon_favorito_id=? WHERE id=?`,
        [nome, sexo, regiao, pokemon_favorito_id, id]
    );
    res.json({ message: "Atualizado!" });
}