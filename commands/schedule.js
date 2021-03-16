
module.exports = {
    name: "الجدول",
    description: "إظهار جدول المحاضرات",
    usage: "@الجدول",
    execute(ctx, args) {
        ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo")
        ctx.replyWithPhoto( { source: `${__dirname}/../images/sch.jpg`, "reply_to_message_id": "تم إرسال الجدول بنجاح"} )
    }
}