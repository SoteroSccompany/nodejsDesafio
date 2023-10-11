


const app = require('express')
const server = app()
const mysql = require('mysql2')
const config = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'fullcycle'
});

const data = []

config.connect((err) => {
    if (err) {
        console.error('Erro ao conectar: ' + err.stack);
        return;
    }
    console.log('Conectado como ID ' + config.threadId);

    // Crie uma tabela
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE
      )
    `;
    const insertPeopleQuery = `
        INSERT INTO people(name, email) VALUES
        ('Rafael', 'exemplo@exemplo.com'),
        ('João', 'exemplo1@exemplo1.com');`;


    config.query(createTableQuery, (err, results) => {
        if (err) {
            console.error('Erro ao criar tabela: ' + err.stack);
            return;
        }
        console.log('Tabela criada com sucesso!');

        // Feche a conexão
        config.end();
    });

    config.query(insertPeopleQuery, (err, results) => {
        if (err) {
            console.error('Erro ao criar tabela: ' + err.stack);
            return;
        }
        console.log('Dados inseridos com sucesso!');
    })
    const query = 'SELECT * FROM people';
    config.query(query, (err, results) => {
        if (err) throw err;
        results.forEach(result => {
            data.push(result)
        });
        console.log(data)
    });
    config.end();
        
});

server.get('/', async (req, res) => {
    //htmlContent 
    const htmlContent = `
    <h1>Full Cycle Rocks!</h1>
    <ul>
        ${data.map(item => `<li>${item.name} - ${item.email}</li>`).join('')}
    </ul>
    `
    res.send(htmlContent)
})


server.listen(3000, () => {
    console.log('Rodando na porta 3000')
})

console.log('Rodando na porta 3000')