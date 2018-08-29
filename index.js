require("dotenv").config();
const Telegraf = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

const usersToNotify = [];

bot.start(ctx => ctx.reply("Benvenuto"));
bot.help(ctx => ctx.reply("/notify - Per ricevere notifiche "));
bot.command("notify", ctx => {
  usersToNotify.push(ctx.from);
  ctx.reply(`Ti notificherò ${ctx.from.first_name}`);
});

usersToNotify.forEach(user => bot.telegram.sendMessage(user.id, 'Eccoti la notifica'));

bot.startPolling();
