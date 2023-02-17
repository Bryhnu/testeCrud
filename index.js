// imports
const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const port = 4000

// express
const app = express();

// configurar o handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


app.use(express.static('public'));


// rotas
app.get('/', function (req, res) {
    res.render('home', { layout: false })
})

app.use(
    express.urlencoded({
        extended: true
    })
)


//Cadastrar medico
app.post('/CadastrarM', (req, res) => {

    const nome = req.body.nome
    const cpf = req.body.cpf
    const email = req.body.email
    const telefone = req.body.telefone

    const sql = `INSERT INTO medico (nome, email, telefone, cpf) VALUES ('${nome}','${email}','${telefone}','${cpf}')`
    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }

        console.log("Cadastro com sucesso!")
        res.redirect('/loginM')
    })
})



// page login
app.get('/loginM', (req, res) => {
    res.render('loginM', { layout: false })

})



// page fake login
app.post('/login', (req, res) => {
    const id = req.body.nome

    const sql = `SELECT * FROM medico WHERE id = ${id}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const listarmedico = data[0]
        res.render('medicoId', { layout: false, listarmedico })

    })
})


//Consultar medicos
app.get('/medicos', (req, res) => {
    const sql = 'SELECT * FROM medico'

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err);
            return
        }

        const listar = data

        console.log(listar);

        res.render('medicos', { layout: false, listar })
    })
})


// consulta um registro pelo id
app.get('/medicos/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM medico WHERE id = ${id}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const listarmedico = data[0]
        res.render('medicoId', { layout: false, listarmedico })
    })
})


// Editando informaçoes do medico

// pegando o registro
app.get('/medico/editar/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM medico where id = ${id}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const editarmedico = data[0]
        res.render('editar', { layout: false, editarmedico })
    })
})


// editando o registro 
app.post('/medico/update', (req, res) => {

    const id = req.body.id
    const nome = req.body.nome
    const cpf = req.body.cpf
    const email = req.body.email
    const telefone = req.body.telefone

    const sql = `UPDATE medico SET nome = '${nome}', email = '${email}', telefone = '${telefone}', cpf = '${cpf}' WHERE id = '${id}'`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/loginM')
    })

})


// excluindo o medico
app.get('/medico/excluir/:id', (req, res) =>{

    const id = req.params.id

    const sql = `DELETE FROM medico WHERE id = '${id}'`

    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return;
        }

        res.redirect('/loginM')
    })

})


// conexão bd
const conn = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'clinicateste'
})

conn.connect(function (err) {
    if (err) {
        console.log(err);
    }

    console.log('Conectado com sucesso');
})

app.listen(port, () => {
    console.log(`app rodando na porta ${port}`);
})