require("dotenv").config();
const Telegraf = require("telegraf");

const commandArgs = require("./src/middlewares/commandArgsParser");
const plugins = require("./plugins.js");
const intervalHandler = require("./src/IntervalHandler");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(commandArgs());

// Giving bot instance to plugins
Object.keys(plugins).forEach(key => {
  plugins[key].setBotInstance(bot);
});

bot.start(({ reply, from }) => {
  reply("Benvenuto. Notificherò solo il mio padrone.");
  if (from.id === process.env.MY_TELEGRAM_ID) intervalHandler.start();
});

bot.command("stop", ({ from }) => {
  if (from.id === process.env.MY_TELEGRAM_ID) intervalHandler.clear();
});

bot.startPolling();
