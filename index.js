const pg = require('pg');

const config = {
    host: 'localhost',
    user: 'postgres',     
    password: 'apd02000',
    database: 'empresa',
    port: 5432,
};

const client = new pg.Client(config);

function insertDataProjeto(ProjNum = 1, Dnum = 50, ProjLocal = 200) {
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

function insertDataDepartamento(Dnum = 1) {
    for (var i = 1; i <= 50; i++) {
        console.log("departamento:", i)
        
        console.log("ID departamento: ", Dnum)
        var insert = `INSERT INTO DEPARTAMENTO (Dnum, Cpf_ger) VALUES (${Dnum}, ${i})`
        Dnum++
        client.query(insert);
    }
}

function insertDataFuncionario(Cpf = 1, Dnr = 50, Salario = 500) {
    for (var i = 1; i <= Salario; i++) {
        console.log("departamento:", i)
        for (var j = 1; j <= Dnr; j++) {
            console.log("PROJETO: ", Cpf)
            var insert = `INSERT INTO FUNCIONARIO (Cpf, Dnr, Salario) VALUES (${Cpf}, ${i}, ${j})`
            Cpf++
            client.query(insert);
        }
    }
}


async function searchProjNum(){
    console.log('Carregando dados..')
    try {
        const res = await client.query('SELECT * FROM projeto WHERE projnumero = 50')
        console.log(res)
    } catch (err) {
        console.log(err.stack)
    }
    return
}

const createTables = `
    DROP TABLE IF EXISTS PROJETO;
    DROP TABLE IF EXISTS DEPARTAMENTO;
    DROP TABLE IF EXISTS FUNCIONARIO;
    CREATE TABLE PROJETO (projnumero INTEGER PRIMARY KEY, projlocal INTEGER, Dnum INTEGER);
    CREATE TABLE DEPARTAMENTO (Dnum INTEGER PRIMARY KEY, Cpf_ger INTEGER);
    CREATE TABLE FUNCIONARIO (Cpf INTEGER PRIMARY KEY, Dnr INTEGER, Salario INTEGER);
    `
    
client.connect(err => {
    if (err) throw err;
    else {
        client.query(createTables);
        insertDataProjeto();
        insertDataDepartamento();
        insertDataFuncionario();
        client.query('CREATE UNIQUE INDEX indiceProjNumero ON PROJETO (projlocal);');
        searchProjNum();

        client.end(console.log('Comandos executados com sucesso, conexão com o cliente encerrada!'))
            .then(() => {
                console.log('Fim de execução');
                process.exit();
            });
    }
});    
    




