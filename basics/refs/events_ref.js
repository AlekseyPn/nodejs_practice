const EventEmitter = require("events");

// Events
class Logger extends EventEmitter {
    log(message) {
        this.emit("message", `${message} ${new Date().toDateString()}`)
    }
}

const logger = new Logger();

logger.on("message", data => {
    console.log(data);
});

logger.log("Hello");
