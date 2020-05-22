const TelegramBot = require('node-telegram-bot-api')
// Require custom-env and set your preferred env file
require('custom-env').env('development')
const fs = require('fs');

const token = process.env.BOT_TOKEN

const bot = new TelegramBot(token, { polling: true })

//Plantilla de Bienvenida

bot.on('polling_error', (error) => {
    console.log(error);
})
//Mensaje de Bienvenida
bot.onText(/^\/start/, (msg) => {
    var chatId = msg.chat.id
    var userName = msg.from.first_name

    bot.sendMessage(chatId, "No,No,No...")
    bot.sendSticker(chatId, "stickers/sticker.webp")
})

//Localizacion

bot.onText(/getLocation/, (msg) => {
    const opts = {
        reply_markup: JSON.stringify({
            keyboard: [
                [{ text: 'Location', request_location: true }],
                [{ text: 'Contact', request_contact: true }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        }),
    };
    bot.sendMessage(msg.chat.id, 'Contact and Location request', opts);
});

bot.on('location', (msg) => {
    console.log(msg.location.latitude);
    console.log(msg.location.longitude);
});