"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3010;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const clients = [];
app.get("/events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.write(`data: Connected to SSE\n\n`);
    clients.push(res);
    req.on("close", () => {
        const index = clients.indexOf(res);
        if (index !== -1) {
            clients.splice(index, 1);
        }
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
            console.error("failed to send message to client", error);
        }
    });
}, 2000);
app.get("/relay", (req, res) => {
    if (!req.query.type) {
        res.status(404).send("You need to provide a type");
        return;
    }
    const message = JSON.stringify({ type: req.query.type, msg: req.query.msg });
    console.log(`/relay: sending message ${message}`);
    let count = 0;
    clients.forEach((client) => {
        try {
            client.write(`data: ${message}\n\n`);
            count++;
        }
        catch (error) {
            console.log("failed to send message to client", error);
        }
    });
    console.log(`relayed to ${count} clients`);
    res.status(200).send();
});
app.listen(PORT, () => {
    console.log(`SSE server running on http://localhost:${PORT}`);
});
