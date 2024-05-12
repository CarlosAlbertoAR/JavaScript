const wwebVersion = '2.2412.54';

//const qrCode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const database = require("./dao/database");


const client = new Client({
    authStrategy: new LocalAuth(),
    webVersionCache: {
        type: 'remote',
        remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
    },    
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('WhatsApp Client On line!');
});

client.on('message', msg => {
    //contact = msg.getContact();
    
    //if (msg.body == '!ping') {
    //    msg.reply('pong');
    //}

    database.insertChat(msg);
    msg.reply('Olá, aqui é o CATO, sua mensagem foi salva com sucesso.');

});

client.initialize();