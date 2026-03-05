import { openDb } from '../configDB.js';

export async function listarTime(req, res) {
    const { treinador_id } = req.params;
    const db = await openDb();
    const time = await db.all(`
        SELECT p.* FROM Pokemon p 
        JOIN Times t ON p.id = t.pokemon_id 
        WHERE t.treinador_id = ?`, [treinador_id]);
    res.json(time);
}

export async function adicionarAoTime(req, res) {
    const { treinador_id, pokemon_id } = req.body;
    const db = await openDb();

    // Validação: máximo 6
    const count = await db.get('SELECT COUNT(*) as total FROM Times WHERE treinador_id = ?', [treinador_id]);
    if (count.total >= 6) return res.status(400).json({ message: "Time cheio! Máximo 6." });

    try {
        await db.run('INSERT INTO Times (treinador_id, pokemon_id) VALUES (?,?)', [treinador_id, pokemon_id]);
        res.json({ message: "Pokémon capturado para o time!" });
    } catch (e) {
        res.status(400).json({ message: "Este Pokémon já está no time." });
    }
}

export async function removerDoTime(req, res) {
    const { treinador_id, pokemon_id } = req.body;
    const db = await openDb();
    await db.run('DELETE FROM Times WHERE treinador_id = ? AND pokemon_id = ?', [treinador_id, pokemon_id]);
    res.json({ message: "Removido do time." });
}