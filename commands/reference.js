const refs = require("../references/index.json")
const { Keyboard, Key } = require("telegram-keyboard")

module.exports = {
    name: "مرجع",
    description: "يرسل المرجع لمادة محددة",
    usage: "@مرجع <اسم المادة>",
    execute(ctx, args, bot) {
        let refNames = []
        refs.forEach(r => refNames.push(r.name))
        let mainMenu = []
        for(let i = 0; i < refNames.length; i++) {
            mainMenu.push(Key.callback(refNames[i], `ref:${refs.find(r => r.name === refNames[i])?.id}`))
        }
        const keyboard = Keyboard.make(mainMenu, { wrap: (row, i, button) => i%2 })
        return ctx.reply("يرجى اختيار المادّة", keyboard.inline())
    }
}