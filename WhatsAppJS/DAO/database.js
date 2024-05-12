require('whatsapp-web.js');

async function connect() {
    if (global.connection)
        return global.connection.connect();
 
    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: 'postgres://postgres:Cato@123@localhost:/whatsapp'
    });
 
    const client = await pool.connect();
    console.log("Banco de dados conectado.");
 
    const resultset = await client.query('SELECT NOW()');
    console.log('Hora do servidor: ' + resultset.rows[0]);
    client.release();
 
    global.connection = pool;
    return pool.connect();
}

async function insertChat(message){
    const client = await connect();
    const sql = 'INSERT INTO chat.inbox         ' +
                '            (id,               ' +
                '             date,             ' +
                '             "to",             ' +
                '             "from",           ' +
                '             author,           ' +
                '             body)             ' +
                '     VALUES                    ' +
                '            ($1,               ' +
                '             to_timestamp($2), ' +
                '             $3,               ' +
                '             $4,               ' +
                '             $5,               ' +
                '             $6)               ' ;

    const values = [message.id.id,
                    message.timestamp,
                    message.to,
                    message.from,
                    message.author,
                    message.body];

    return await client.query(sql, values);
}


module.exports = { insertChat };