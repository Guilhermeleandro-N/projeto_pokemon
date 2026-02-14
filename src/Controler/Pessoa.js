import { openDb } from '../configDB.js';

export async function createTable(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Pessoa ( id INTEGER PRIMARY KEY, nome TEXT, idade INTEGER )')
    })
}

export async function createFavoritasTable(){
    const db = await openDb();

    await db.exec(`
    
        CREATE TABLE IF NOT EXISTS Favoritas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userID INTEGER,
            pessoa1 INTEGER,
            pessoa2 INTEGER,
            pessoa3 INTEGER,
            pessoa4 INTEGER,
            pessoa5 INTEGER,
            pessoa6 INTEGER
        );
    `);
}





export async function selectPessoas(req, res){
    const nome = req.query.nome;

    openDb().then(db => {

        if(nome){
            db.all(
                'SELECT * FROM Pessoa WHERE nome LIKE ?',
                [`%${nome}%`]
            ).then(pessoas => res.json(pessoas));
        } else {
            db.all('SELECT * FROM Pessoa')
              .then(pessoas => res.json(pessoas));
        }

    });
}


export async function selectPessoa(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('SELECT * FROM Pessoa WHERE id=?', [id])
        .then(pessoa=> res.json(pessoa) );
    });
}

export async function insertPessoa(req, res){
    let pessoa = req.body;
    openDb().then(db=>{
        db.run('INSERT INTO Pessoa (nome, idade) VALUES (?,?)', [pessoa.nome, pessoa.idade]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function updatePessoa(req, res) {
     let pessoa = req.body;
     let {id} = req.params;
    openDb().then(db => { db.run('UPDATE Pessoa SET nome=?, idade=? WHERE id=?', [pessoa.nome, pessoa.idade, id]); });
       res.json({ "statusCode": 200 }) }


export async function deletePessoa(req, res){
    const { id } = req.params;

    const db = await openDb();

    await db.run('DELETE FROM Pessoa WHERE id=?', [id]);

    res.status(200).json({
        message: "Pessoa deletada com sucesso"
    });
}   