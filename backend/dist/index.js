"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pino_http_1 = __importDefault(require("pino-http"));
const app = (0, express_1.default)();
const PORT = 3010;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, pino_http_1.default)({
    quietReqLogger: true, // turn off the default logging output
    transport: {
        target: "pino-http-print", // use the pino-http-print transport and its formatting output
        options: {
            destination: 1,
            all: true,
            translateTime: "HH:MM:ss.l",
            colorize: true,
        },
    },
}));
const clients = [];
app.get("/events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.write(`data: Connected to SSE\n\n`);
    clients.push(res);
    req.log.info("client connected, now have %d client(s)", clients.length);
    req.on("close", () => {
        const index = clients.indexOf(res);
        if (index !== -1) {
            clients.splice(index, 1);
        }
        else {
            req.log.warn("failed to remove client from clients array");
        }
        req.log.info("client disconnected");
        res.status(200).send();
    });
});
// Health-check messages
setInterval(() => {
    const message = { time: new Date().toISOString() };
    clients.forEach((client) => {
        try {
            client.write(`data: ${JSON.stringify(message)}\n\n`);
        }
        catch (error) {
            client.log.error("failed to send message to client %o", error);
        }
    });
}, 2000);
app.get("/relay", (req, res) => {
    if (!req.query.type) {
        res.status(404).send("You need to provide a type");
        return;
    }
    const message = { type: req.query.type, msg: req.query.msg };
    req.log.info("received message %o", message);
    let count = 0;
    clients.forEach((client) => {
        try {
            client.write(`data: ${JSON.stringify(message)}\n\n`);
            count++;
        }
        catch (error) {
            req.log.error("failed to send message to client %o", error);
        }
    });
    req.log.info("relayed message %o to %d clients", message, clients.length);
    res.status(200).send();
});
app.listen(PORT, () => {
    console.log(`SSE server running on http://localhost:${PORT}`);
});
