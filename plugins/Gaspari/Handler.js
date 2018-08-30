const moment = require("moment");

const getHtml = require("./request");
const parser = require("./parser");

class Handler {
  constructor() {
    if (!Handler.instance) {
      Handler.instance = this;
    }

    this.bot = null;

    this.error = false;
    this.datesInterval = null;

    return Handler.instance;
  }

  setBotInstance(bot) {
    this.bot = bot;

    // Register commands you wanna add
    this.bot.command("dates", ctx => this.datesController(ctx));
    this.bot.command("resetdates", ctx => this.resetDatesController(ctx));
  }

  setDatesInterval(
    start = moment(new Date()).add(1, "days"),
    end = moment(new Date()).add(15, "days")
  ) {
    this.datesInterval = { start, end };
  }

  datesController({ state, reply, from }) {
    if (from.id === Number(process.env.MY_TELEGRAM_ID)) {
      if (state.command && state.command.args.length === 2) {
        const [start, end] = state.command.args;
        this.setDatesInterval(start, end);

        reply(`Sto cercando biglietti dal ${start} al ${end}.`);
      } else {
        reply(`Devi specificare l'intervallo di date che vuoi controllare. 
Devono essere esattamente due e scritte nel seguente formato: dd/mm/yyyy dd/mm/yyyy`);
      }
    }
  }

  resetDatesController({ from }) {
    if (from.id === process.env.MY_TELEGRAM_ID) {
      this.setDatesInterval();
    }
  }

  async job() {
    const requestCalls = [];
    while (!this.datesInterval.start.isSame(this.datesInterval.end)) {
      requestCalls.push(getHtml(this.datesInterval.start));
      this.datesInterval.start.add(1, "days"); // it's mutable
    }

    try {
      const pagesHtml = await Promise.all(requestCalls);
      const underPricedTickets = parser(pagesHtml);
      if (underPricedTickets.length) {
        // TODO send message only every 30 minutes, just check with Date()
        this.bot.telegram.sendMessage(
          process.env.MY_TELEGRAM_ID,
          "Eccoti la notifica"
        );
      }
    } catch (e) {
      if (!this.error) {
        this.error = true;
        return this.bot.telegram.sendMessage(
          process.env.MY_TELEGRAM_ID,
          "Si sono verificati errori nelle richieste. TI aggiorno appena torna tutto alla normalità"
        );
      }
    }

    if (this.error) this.error = false;
    return null;
  }
}

module.exports = new Handler();
