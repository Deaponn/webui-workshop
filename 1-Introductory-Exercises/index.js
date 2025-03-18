// Include required modules
const { HttpServer, WebSocket, WebSocketMessage, LogManager } = require("@aliceo2/web-ui");

// create instance of http server
const http = new HttpServer(
    {
        port: 8080,
    },
    {
        secret: "my very very secret phrase (do not leak!)",
        expiration: "30s",
        issuer: "o2-workshop",
        maxAge: "7d",
    }
);

const webSocket = new WebSocket(http);
webSocket.bind("hello", (message) => {
    if (!message.payload) logger.errorMessage(`no message payload: ${message.payload}`);
    return new WebSocketMessage()
        .setCommand('hello-back')
        .setPayload(`received: ${message.payload}, response: hello back!`);
});

const logger = LogManager.getLogger('my-app');
logger.debugMessage('LogManager service up and running');

// Server `public` folder
http.addStaticPath("public");

http.get(
    "/public",
    (req, res) => {
        logger.infoMessage('Accessing public API route');
        res.status(200).json({ message: "hi" });
    },
    { public: true } // turns off JWT verification
);

http.get(
    "/private",
    (req, res) => {
        logger.warnMessage('Accessing private API route');
        res.status(200).json({ message: "hi, but privately" });
    }
);
