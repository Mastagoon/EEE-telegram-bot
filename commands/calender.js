
module.exports = {
    name: "التقويم",
    description: "يرسل صورة التقويم الدراسي",
    usage: "@التقويم",
    execute(ctx, args) {
        ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo")
        ctx.replyWithPhoto( { source: `${__dirname}/../images/calender.jpg`, "reply_to_message_id": "تم إرسال التقويم بنجاح."} )
    }
}