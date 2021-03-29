const { Telegraf } = require('telegraf')
const fs = require("fs")
const selectReference = require('./functions/selectReference')
require("dotenv").config()
const prefix = process.env.PREFIX

let commands = []

const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(".js"))

for(const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push({ name: command.name, command })
}

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.launch()

//we're gonna use the text event instead of bot.command. to support arabic commands.
bot.on(`text`, ctx => {
    const args = ctx.message.text.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    if(!commands.find(c => c.name === command)) return
    try {
        commands.find(c => c.name === command).command.execute(ctx, args, bot)
    } catch(err) {
        ctx.reply(`لقد حدث خطأ ما...@`)
        console.log(err.message)
    }
})

bot.on('callback_query', (ctx) => {
    const [actionType, actionData] = ctx.callbackQuery.data.split(':')
    selectReference(ctx, actionType, actionData)
    return ctx.answerCbQuery()
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))