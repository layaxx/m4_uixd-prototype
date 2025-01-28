import express from "express"
import type { Express, Response } from "express"
import cors from "cors"
import pino from "pino-http"
import path from "node:path"
import { z } from "zod"
import { Party, PrismaClient, Vote } from "@prisma/client"

const prisma = new PrismaClient()

const app: Express = express()
const PORT = 3000

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

app.get("/status", (_request, response) => {
  response.status(200).send("Running")
})

app.get("/controller", function (_request, response) {
  // eslint-disable-next-line unicorn/prefer-module
  response.sendFile(path.join(__dirname, "/static/controller.html"))
})

const clients: Response[] = []

enum ResponseType {
  COMPLETE_DATA = "complete",
  PARTIAL_DATA = "partial",
  INFO = "info",
}

app.get("/events", async (request, response) => {
  response.setHeader("Content-Type", "text/event-stream")
  response.setHeader("Cache-Control", "no-cache")
  response.setHeader("Connection", "keep-alive")

  response.write(
    `data: ${JSON.stringify({
      type: ResponseType.INFO,
      msg: "Connected to SSE",
    })}\n\n`
  )

  clients.push(response)
  request.log.info("client connected, now have %d client(s)", clients.length)

  try {
    const votes = await prisma.vote.findMany()
    response.write(
      `data: ${JSON.stringify({ type: ResponseType.COMPLETE_DATA, votes })}\n\n`
    )
    request.log.info("Sent complete initial data to client")
  } catch (error) {
    request.log.error(
      "Failed to push complete initial data to client. Error: %o",
      error
    )
  }

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
      client.write(
        `data: ${JSON.stringify({
          type: ResponseType.INFO,
          msg: JSON.stringify(message),
        })}\n\n`
      )
    } catch (error) {
      client.log.error("failed to send message to client %o", error)
    }
  }
}, 2000)

const VoteParameterSchema = z.object({
  party: z.nativeEnum(Party, {}),
  cardID: z.string().min(5),
})

app.get("/register-vote", async (request, response) => {
  const { success, data, error } = await VoteParameterSchema.safeParseAsync(
    request.query
  )
  if (!success) {
    response.status(404).json(error.issues)
    return
  }

  request.log.info("received vote for %s", data.party)

  let vote: Vote
  try {
    vote = await prisma.vote.create({ data })
    request.log.info("created db entry (%s) for vote", vote.id)
  } catch (error) {
    request.log.error(
      "failed to create db entry for vote %o.\nError: %o",
      data,
      error
    )
    response.status(500).send(JSON.stringify(error))
  }

  let count = 0
  for (const client of clients) {
    try {
      client.write(
        `data: ${JSON.stringify({
          type: ResponseType.PARTIAL_DATA,
          vote: vote!,
        })}\n\n`
      )
      count++
    } catch (error) {
      request.log.error("failed to send data to client %o", error)
    }
  }
  request.log.info("relayed data %o to %d clients", data, count)

  response.status(200).send()
})

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SSE server running on http://localhost:${PORT}`)
})
