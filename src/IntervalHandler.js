class IntervalHandler {
  constructor(pluginsInstances) {
    this.intervalID = null;
    this.intervalMs = 3000 * 10;
    this.plugins = pluginsInstances;
    // this.intervalMs = 300 * 10000;

    // Getting the jobs that plugins must execute
    this.jobsFromPlugins = Object.keys(this.plugins).map(
      key => this.plugins[key].job
    );
  }

  clear() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = null;
    }
  }

  start() {
    this.clear();
    this.intervalID = setInterval(
      () => this.executeRequests(),
      this.intervalMs
    );
  }

  executeRequests() {
    this.jobsFromPlugins.forEach(job => job());
  }
}

module.exports = IntervalHandler;
