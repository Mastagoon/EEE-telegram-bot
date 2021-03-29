const refs = require("../references/index.json")
const { Keyboard, Key } = require("telegram-keyboard")

module.exports = async (ctx, type, data) => {
    let index = 0
    let ref = {}
    const message = ctx.update.callback_query.message
    if(type === "ref") {    // 1st menu
        ref = refs.find(r => r.id == data)
        if(!ref) return ctx.reply("لقد حدث خطأ ما...")  // should never happen
        let menu = ref.menu?.split("|")
        if(ref.menu) {
            let keys = []
            menu.forEach((item, i) => {
                keys.push(Key.callback(item, `menu:${data}_${i}`))
            })
            const keyboard = await Keyboard.make(keys, { wrap: (row, i, button) => i%2 })
            ctx.deleteMessage()
            return ctx.reply("يرجى الاختيار من القائمة", keyboard.inline()) // #TODO use editmessagereplymarkup instead.
            // return await ctx.telegram.editMessageReplyMarkup(message.chat.id, message.message_id, '', keyboard.inline())
        }
        // no menu, send the ref file
    } else if(type === "menu") {
        const [refId, choiceId] = data.split("_")
        ref = refs.find(r => r.id === Number(refId))
        if(!ref) return ctx.reply("لقد حدث خطأ ما...")  // should never happen
        index = choiceId
        if(!index) return ctx.reply("لقد حدث خطأ ما...")
        ctx.deleteMessage()
        // send file
    }
    
    return ctx.telegram.sendDocument(message.chat.id, {
        source: `${__dirname}/../references/${ref.files.split("|")[index]}`,
        filename: `${__dirname}/../references/${ref.files.split("|")[index]}`
    })
}