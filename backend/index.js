const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 3010

app.use(express.json())
app.use(cors())

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Connection", "keep-alive")

  res.write(`data: Connected to SSE\n\n`)

  const interval = setInterval(() => {
    const message = { time: new Date().toISOString() }
    res.write(`data: ${JSON.stringify(message)}\n\n`)
  }, 2000)

  req.on("close", () => {
    clearInterval(interval)
    res.end()
  })
})

app.listen(PORT, () => {
  console.log(`SSE server running on http://localhost:${PORT}`)
})
