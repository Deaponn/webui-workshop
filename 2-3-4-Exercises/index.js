const path = require("path");
const config = require("./config.js");

const { HttpServer } = require("@aliceo2/web-ui");

const { WebSocket, WebSocketMessage } = require("@aliceo2/web-ui");
const { default: ApplicationService } = require("./lib/ApplicationService.js");

const http = new HttpServer(config.http, config.jwt, config.oAuth);
http.addStaticPath(path.join(__dirname, "public"));

const ws = new WebSocket(http);

ws.bind("random", () =>
    new WebSocketMessage().setCommand("random").setPayload({ result: Math.random() })
);

setInterval(() => {
    ws.broadcast(new WebSocketMessage().setCommand("random").setPayload({ result: Math.random() }));
}, 5000);

http.get("/app-info", (req, res) => {
    setTimeout(() => {
        res.status(200).send(ApplicationService.getAppInfo());
    }, 3000);
});
