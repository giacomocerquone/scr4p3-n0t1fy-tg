require("dotenv").config();
const Telegraf = require("telegraf");

const commandArgs = require("./src/middlewares/commandArgsParser");
const plugins = require("./plugins.js");
const IntervalHandler = require("./src/IntervalHandler");

const bot = new Telegraf(process.env.BOT_TOKEN);
const pluginsJobs = {};
bot.use(commandArgs());

// Giving bot instance to plugins
Object.keys(plugins).forEach(key => {
  pluginsJobs[key] = new plugins[key](bot);
});

const interval = new IntervalHandler(pluginsJobs);
interval.start();

bot.start(({ reply }) => {
  reply("Benvenuto. Notificherò solo il mio padrone.");
});

bot.command("init", ({ reply, from }) => {
  reply("Inizio il lavoro.");
  if (from.id === Number(process.env.MY_TELEGRAM_ID)) interval.start();
});

bot.command("status", ({ reply, from }) => {
  if (from.id === Number(process.env.MY_TELEGRAM_ID)) {
    if (interval.intervalID) {
      reply("Sto lavorando.");
    } else {
      reply("Sono fermo.");
    }
  }
});

bot.command("stop", ({ reply, from }) => {
  reply("Fermo il lavoro.");
  if (from.id === Number(process.env.MY_TELEGRAM_ID)) interval.clear();
});

bot.startPolling();
