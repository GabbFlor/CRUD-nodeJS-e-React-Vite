const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

// cria uma aplicação usando o express como principal
const app = express();
// permite que os dados sejam acessados de diferentes origens
app.use(cors());
// permite o código analisar o corpo das requisições (que vem do React como .json)
app.use(bodyParser.json());

// cria a conexão com o banco de dados mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testeReactVite'
});

// executa o comando de execução e capta o erro se tiver
db.connect(err => {
    if (err) throw err;
    console.log('Conectado com o banco de dados MySql');
});

// IMPORTANTE:
// Apenas na próxima função "CREATE" terá os comentários detalhados, todas as outras funções seguem a mesma lógica

// CREATE
app.post('/users', (req, res) => {
    // coleta as informações enviadas na requisição (do React)
    const { name, email } = req.body;

    // cria a query para selecionar todos os usuários que tem o email igual a requisição "email"
    const checkCopyUser = 'SELECT * FROM users WHERE email = ?';
    // executa a query, o campo "[email]" está substituindo o "?" na query, semelhante ao PDO do php
    db.query(checkCopyUser, [email], (checkErr, checkResult) => {
        // caso tiver algum erro, ele cria e armazena o mesmo na variável "checkErr"
        if (checkErr) {
            // envia o errorCode 500 (internal-server-error) como resposta a requisição
            res.status(500).send({ error: 'Erro no banco de dados.' })
            return;
        }

        // verifica a quantidade de linhas no resultado, se for maior que 0, outro usuário está utilizando o email e portanto a execução não terá continuação
        if (checkResult.length > 0) {
            // envia o errorCode 409 (confict-error) como resposta a requisição
            res.status(409).send({ error: 'Email de usuário já está sendo utilizado.' })
            return;
        }

        // caso não tiver nenhum erro, ele cotinuará na query de adicionar o usuário no banco de dados
        const addUserSql = 'INSERT INTO users (name, email) VALUES (?, ?)';
        // aqui o campo "[name, email]" substitui o campo "(?, ?)" na query na mesma ordem
        db.query(addUserSql, [name, email], (AddErr, AddResult) => {
            // verifica se tem erro
            if (AddErr) {
                // envia o errorCode 500 (internal-server-error) como resposta a requisição
                res.status(500).send({ error: 'Falha ao adicionar o usuário.' })
                return;
            }
            // retorna o resultado da query a requisição, no caso quando o usuário for adicionado ao banco (sucesso)
            res.send(AddResult);
        });
    });
});


// READ - Recupera todos os usuários
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Erro no banco de dados' })
        };
        res.send(results);
    });
}); 


// READ - recupera um usuário com id específico
app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Erro no banco de dados' })
            return;
        }

        if (result.length === 0) {
            res.status(404).send({ error: 'Usuário não encontrado' })
            return;
        }

        res.send(result[0]);
    })
})


// UPDATE
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    
    const { name, email } = req.body;

    
    const checkUserSql = 'SELECT * FROM users WHERE id = ?';
    
    db.query(checkUserSql, [id], (checkErr, checkResult) => {
        
        if (checkErr) {
            res.status(500).send({ error: 'Erro no banco de dados.' })
            return;
        }

        
        if (checkResult.length === 0) {
            res.status(404).send({ error: 'Usuário não encontrado.' });
            return;
        }

        
        const updateUserSql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
        db.query(updateUserSql, [name, email, id], (updateErr, updateResult) => {
            if (updateErr) {
                res.status(500).send({ error: 'Falha ao editar o usuário.' })
                return;
            }
            res.send(updateResult);
        });
    });
});



// DELETE
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// aqui definimos a porta em que o servidor está rodando, e caso realmente estiver rodando, imprime a mensagem no console
app.listen(3001, () => {
    console.log('Servidor está rodando na porta 3001');
});