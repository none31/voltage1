var express = require('express');
var r = express.Router();

// load pre-trained model
const model = require('./sdk/model.js');

// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '5070793270:AAGQ6-tMmMSGtlz96ohVc9YLGB3AjzjdsMo'
const bot = new TelegramBot(token, {polling: true});


// bots
bot.onText(/\/start/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `hello ${msg.chat.first_name}, welcome...\n
        click /predict`
    );
    state=0
});

state=0
bot.onText(/\/predict/, (msg) => { 
    bot.sendMessage(
        msg.chat.id,
        `input the value x1,x2,x3`
    );   
    state=1;
});

bot.on('message', (msg) => {
    if(state==1){
        console.log(msg.text);
        s=msg.text.split(',');
        x1=s[0]
        x2=s[1]
        x3=s[2]
        model.predict(
            [parseFloat(s[0]), parseFloat(s[1]), parseFloat(s[2])]
        ).then((jres)=>{
            bot.sendMessage(
                msg.chat.id,
                `predicted y1 is ${jres[0]}`
            );
            bot.sendMessage(
                msg.chat.id,
                `predicted y2 is ${jres[1]}`
            );
            bot.sendMessage(
                msg.chat.id,
                `predicted y3 is ${jres[2]}`
            );
            bot.sendMessage(
                msg.chat.id,
                `/predict again`
            );
            bot.sendMessage(
                msg.chat.id,
                `Created by Effendi`
            );
            state=0
        })
    }
})
// routers
r.get('/prediction/:x1/:x2/:x3', function(req, res, next) {    
    model.predict(
        [
            parseFloat(req.params.x1), // string to float
            parseFloat(req.params.x2),
            parseFloat(req.params.x3)
        ]
    ).then((jres)=>{
        res.json(jres);
    })
});

module.exports = r;
