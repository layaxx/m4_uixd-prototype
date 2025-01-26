import express from "express"
import type { Express, Response } from "express"
import cors from "cors"
import pino from "pino-http"
import path from "node:path"

const app: Express = express()
const PORT = 3010

app.use(express.json())
app.use(cors())

app.use(
  pino({
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
  })
)

app.get("/", function (_request, response) {
  // eslint-disable-next-line unicorn/prefer-module
  response.sendFile(path.join(__dirname, "/static/controller.html"))
})

const clients: Response[] = []

app.get("/events", (request, response) => {
  response.setHeader("Content-Type", "text/event-stream")
  response.setHeader("Cache-Control", "no-cache")
  response.setHeader("Connection", "keep-alive")

  response.write(`data: Connected to SSE\n\n`)

  clients.push(response)
  request.log.info("client connected, now have %d client(s)", clients.length)

  request.on("close", () => {
    const index = clients.indexOf(response)
    if (index === -1) {
      request.log.warn("failed to remove client from clients array")
    } else {
      clients.splice(index, 1)
    }
    request.log.info("client disconnected")
    response.status(200).send()
  })
})

// Health-check messages
setInterval(() => {
  const message = { time: new Date().toISOString() }
  for (const client of clients) {
    try {
      client.write(`data: ${JSON.stringify(message)}\n\n`)
    } catch (error) {
      client.log.error("failed to send message to client %o", error)
    }
  }
}, 2000)

app.get("/relay", (request, response) => {
  if (!request.query.type) {
    response.status(404).send("You need to provide a type")
    return
  }

  const message = { type: request.query.type, msg: request.query.msg }
  request.log.info("received message %o", message)

  let count = 0
  for (const client of clients) {
    try {
      client.write(`data: ${JSON.stringify(message)}\n\n`)
      count++
    } catch (error) {
      request.log.error("failed to send message to client %o", error)
    }
  }
  request.log.info("relayed message %o to %d clients", message, count)

  response.status(200).send()
})

app.listen(PORT, () => {
  console.log(`SSE server running on http://localhost:${PORT}`)
})
