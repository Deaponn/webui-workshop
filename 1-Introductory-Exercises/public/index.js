import { WebSocketClient, sessionService } from "/js/src/index.js";

sessionService.loadAndHideParameters(); // this is important
// console.log(sessionService.get());

const ws = new WebSocketClient(); // this was `ws://localhost:8080/hello?token=${token}`

ws.addListener("authed", () => {
    console.log("ready, lets send a message");
    ws.sendMessage({ command: "hello", payload: "hello my dear friend" });
});

ws.addListener("command", (message) => {
    console.log(message);
    if (message.command === "hello-back") {
        console.log("heard back, response:", message.payload);
    }
});

// this is for general WebSocket, not aliceo2/web-ui WebSocketClient

// ws.onopen = (e) => {
//     console.log("connected to ws", e);
//     ws.send(JSON.stringify({ command: "hello", payload: "test", token: token }));
// };

// ws.onmessage = (e) => {
//     console.log("message received", e.data);
// };
