const refs = require("../references/index.json")

module.exports = {
    name: "مرجع",
    description: "يرسل المرجع لمادة محددة",
    usage: "@مرجع <اسم المادة>",
    execute(ctx, args) {
        const ref = refs.find(r => r.name === args?.join(" "))
        if(!args || !ref) {
            let res = 'طريقة الاستعمال: @مرجع <اسم المادة>\nمثال: @مرجع رسم كهربائي\n\nالمراجع المتاحة:\n'
            refs.forEach(ref => res += `${ref.name}\n`)
            res += `.`
            return ctx.reply(res)
        }
        // ctx.telegram.sendChatAction(ctx.chat.id, "upload_file") #TODO fix me
        ctx.telegram.sendDocument(ctx.message.chat.id, {
            source: `${__dirname}/../references/${ref.file}`,
            filename: `${__dirname}/../references/${ref.file}`
        })
    }
}