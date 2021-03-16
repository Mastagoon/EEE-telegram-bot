const fs = require("fs")

const commandFiles = fs.readdirSync(__dirname).filter(f => f.endsWith(".js"))

module.exports = {
    name: "المساعدة",
    description: "إظهار قائمة بالأوامر",
    usage: "@المساعدة",
    execute(ctx, args) {
        let res = `قائمة بالأوامر المتاحة:\n`
        for(const file of commandFiles) {
            const command = require(`./${file}`)
            res += `${command.name}\n${command.description}\nطريقة الاستخدام: ${command.usage}`
            res += `\n\n`
        }
        res += '.'
        return ctx.reply(res)
    }
}