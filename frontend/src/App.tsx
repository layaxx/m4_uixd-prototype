import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [messages, setMessages] = useState("")

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3010/events")

    eventSource.onmessage = (event) => {
      console.log("Received event:", event.data)
      setMessages(event.data)
    }

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error)
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div>
      <h1 className="font-bold">Real-Time Messages</h1>
      <p>{messages}</p>
    </div>
  )
}

export default App
