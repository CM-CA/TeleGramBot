const TelegramBot = require('node-telegram-bot-api');
var pyshell = require('python-shell');

// Require custom-env and set your preferred env file
require('custom-env').env('development');

const fs = require('fs');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

//Welcome Template

bot.on('polling_error', (error) => {
    console.log(error);
});

//Welcome Message

//Interface

var buttons = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: "Lista Compra", callback_data: 'lista_compra' },
                { text: "Inversiones", callback_data: 'inversiones' },
                { text: "Activar Alerta de Precio", callback_data: 'investiment_alert' },
                { text: "Tareas Pendientes", callback_data: 'tareas_pendientes' },
            ]
        ]
    }
};

bot.onText(/^\/start/, (msg) => {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, "No,No,No...");
    bot.sendSticker(chatId, "stickers/sticker.webp", buttons);

    console.log(msg);
});

//Button Actions

bot.on('callback_query', function onCallBackQuery(actionbutton) {

    const data = actionbutton.data;
    const msg = actionbutton.message;


    if (data === 'inversiones') {
        pyshell.PythonShell.run('./trading/trading_bot/trading.py', null, function (err, results) {
            if (err) throw err;
            return bot.sendMessage(msg.chat.id, "El valor actual de Kyber es " + results);
        });
    }

    if (data === 'investiment_alert') {
        pyshell.PythonShell.run('./trading/trading_bot/cron_alert.py', null, function (err, results) {
            if (err) throw err;
            console.log(results)
            return bot.sendMessage(msg.chat.id, "hh"+results);
        });
    }

});
