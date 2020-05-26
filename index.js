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

//Localization

bot.onText(/getLocation/, (msg) => {
    const opts = {
        reply_markup: JSON.stringify({
            keyboard: [
                [{ text: 'Location', request_location: true }]
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        }),
    };
    bot.sendMessage(msg.chat.id, 'Location request', opts);
});

bot.on('location', (msg) => {
    console.log(msg.location.latitude);
    console.log(msg.location.longitude);
});


bot.on('callback_query', function onCallBackQuery(actionbutton) {

    const data = actionbutton.data;
    const msg = actionbutton.message;

    switch (data) {
        case 'inversiones':

            pyshell.PythonShell.run('./trading/trading.py', null, function (err, results) {
                if (err) throw err;
                var res = results[0];
                return bot.sendMessage(msg.chat.id, "El valor actual de Kyber es " + res);
            });

            break;

        default:
            break;
    }
})
