const plugins = require("../plugins.js");

class IntervalHandler {
  constructor() {
    if (!IntervalHandler.instance) {
      IntervalHandler.instance = this;
    }

    this.intervalID = null;

    // Getting the jobs that plugins must execute
    this.jobsFromPlugins = Object.keys(plugins).map(key => plugins[key].job);

    return IntervalHandler.instance;
  }

  clear() {
    if (this.intervalID) clearInterval(this.intervalID);
  }

  start() {
    this.clear();
    this.intervalID = setInterval(this.executeRequests, 300 * 1000);
  }

  executeRequests() {
    this.jobsFromPlugins.forEach(job => job());
  }
}

module.exports = new IntervalHandler();
