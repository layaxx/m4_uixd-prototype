import express from "express"
import type { Express, Request, Response } from "express"
import cors from "cors"

const app: Express = express()
const PORT = 3010

app.use(express.json())
app.use(cors())

const clients: Response[] = []

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Connection", "keep-alive")

  res.write(`data: Connected to SSE\n\n`)

  clients.push(res)

  req.on("close", () => {
    const index = clients.indexOf(res)
    if (index !== -1) {
      clients.splice(index, 1)
    }
    res.status(200).send()
  })
})

// Health-check messages
setInterval(() => {
  const message = { time: new Date().toISOString() }
  clients.forEach((client) => {
    try {
      client.write(`data: ${JSON.stringify(message)}\n\n`)
    } catch (error) {
      console.error("failed to send message to client", error)
    }
  })
}, 2000)

app.get("/relay", (req, res) => {
  if (!req.query.type) {
    res.status(404).send("You need to provide a type")
    return
  }

  const message = JSON.stringify({ type: req.query.type, msg: req.query.msg })
  console.log(`/relay: sending message ${message}`)

  let count = 0
  clients.forEach((client) => {
    try {
      client.write(`data: ${message}\n\n`)
      count++
    } catch (error) {
      console.log("failed to send message to client", error)
    }
  })
  console.log(`relayed to ${count} clients`)

  res.status(200).send()
})

app.listen(PORT, () => {
  console.log(`SSE server running on http://localhost:${PORT}`)
})
