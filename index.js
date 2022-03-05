const pg = require('pg');

const config = {
    host: 'localhost',
    user: 'postgres',     
    password: 'apd02000',
    database: 'empresa',
    port: 5432,
};

const client = new pg.Client(config);

function insertData(ProjNum = 1, Dnum = 50, ProjLocal = 200) {
    for (var i = 1; i <= ProjLocal; i++) {
        console.log("departamento:", i)
        for (var j = 1; j <= Dnum; j++) {
            console.log("PROJETO: ", ProjNum)
            var insert = `INSERT INTO PROJETO (Projnumero, Projlocal, Dnum) VALUES (${ProjNum}, ${i}, ${j})`
            ProjNum++
            client.query(insert);
        }
    }
}
const createTables = `
    DROP TABLE IF EXISTS PROJETO;
    DROP TABLE IF EXISTS DEPARTAMENTO;
    DROP TABLE IF EXISTS FUNCIONARIO;
    CREATE TABLE PROJETO (projnumero INTEGER, projlocal INTEGER, Dnum INTEGER);
    CREATE TABLE DEPARTAMENTO (Dnumero INTEGER, Cpf_ger INTEGER);
    CREATE TABLE FUNCIONARIO (Cpf INTEGER, Dnr INTEGER, Salario INTEGER);
    `
    
client.connect(err => {
    if (err) throw err;
    else {
        client.query(createTables);
        insertData();
        // client.end(console.log('Comandos executados com sucesso, conexão com o cliente encerrada!'))
        //     .then(() => {
        //         console.log('Fim de execução');
        //         process.exit();
        //     });
    }
});    
    




