# Scr4p3-n0t1fy-tg

This is a micro-framework on top of telegraf nodejs' library in order to easily build a Telegram bot that get information over the web and notifies you about it.
Basically it has just a start and stop telegram commands (that you can expand) and an IntervalHandler class that calls all the functions the plugins will define in order to do your job (plus a middleware for telegraf to parse args inside telegram commands).
Last but not least it has also configured the deployment over [now](https://zeit.co/now).

# Plugins

Add a folder inside the `plugins` folder with the name of your plugin.
Inside this folder add a \*.js file that defines a class and export an object. Period, you're done.

You can find an example of this plugin system on this repo. I've created more directories just to structure better the code for the same reason my handler is a Singleton.<br>You can do whatever you want as long as you export an object with the following methods:

### API

The following methods must be in your \*.js object file in order to let scr4p3-n0t1fy pick-up your logic:

#### setBotInstance(bot)

Through this method, scr4p3-n0t1fy will know how to pass to your object an instance of the bot (this is exactly the [telegraf instance](https://telegraf.js.org/#/)). In this way you can also come up with new commands.

#### job()

This is where you put all your logic that will be called every `n` seconds (now is set to repeat the function every 5 minutes)

### External Documentation

- [Telegraf](https://telegraf.js.org/)
- [Now](https://zeit.co/docs)

### Todo

- Come up with some other API to adjust the interval of setInterval
- Probably a recursive setTimeout is more appropriate for doing http requests sequentially.
- Make stuff more configurable (what stuff?)
