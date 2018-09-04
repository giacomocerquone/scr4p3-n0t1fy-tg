# Scr4p3-n0t1fy-tg

This is a micro-framework on top of telegraf nodejs' library in order to easily build a Telegram bot that get information over the web and notifies you about it.
Basically it has just a start and stop telegram commands (that you can expand) and an IntervalHandler class that calls all the functions the plugins will define in order to do your jobs (plus a middleware for telegraf to parse args inside telegram commands).
I've implemented a little Dependency Injection system where the bot instance (this is exactly the [telegraf instance](https://telegraf.js.org/#/)) is injected into the constructor of your plugins, in this way you can use all the commands telegraf let you use.
Last but not least it has a deploy configuration to run the instance on [now](https://zeit.co/now).

# Plugins

Add a folder inside the `plugins` folder with the name of your plugin.
Inside this folder add a \*.js file that defines a class and export an object. Period, you're done.

You can find an example of this plugin system on this repo. I've created more directories just to structure better the code for the same reason my handler is a Singleton.<br>You can do whatever you want as long as you export an object with the following methods:

### API

The following methods must be in your \*.js object file in order to let scr4p3-n0t1fy pick-up your logic:

#### job()

This is where you put all your logic that will be called every `n` seconds (now is set to repeat the function every 5 minutes).
Pay attention to the this keyword here if you need it here, since the function will be called out in the wild and you'll need to bind it.

### External Documentation

- [Telegraf](https://telegraf.js.org/)
- [Now](https://zeit.co/docs)

### Todo

- Come up with some other API to adjust the interval of setInterval
- Probably a recursive setTimeout is more appropriate for doing http requests sequentially.
- Make stuff more configurable (what stuff?)
