import { useEffect } from "react"
import { RELAY_SERVER_EVENTS, ResponseSchema } from "./common"

function showMessage(vote: unknown) {
  console.log("Received vote:", vote)
}

function VoteApp() {
  useEffect(() => {
    console.log("Connecting to EventSource: ", `${RELAY_SERVER_EVENTS}`)

    const eventSource = new EventSource(RELAY_SERVER_EVENTS)

    eventSource.onmessage = (event) => {
      console.log("Received event:", event.data)

      try {
        JSON.parse(event.data)
        const parsedData = JSON.parse(event.data)
        const { success, data, error } = ResponseSchema.safeParse(parsedData)

        if (!success) {
          console.error("Failed to parse", data, error)
          return
        }

        switch (data.type) {
          case "complete":
            console.log("Received complete data, ignoring")
            break
          case "partial":
            console.log("Received partial data")
            showMessage(data.vote)
            break
          case "info":
            console.log("Received info data")
            console.info(data.msg)
            break
          default:
            console.error("Unknown response type")
        }
      } catch {
        console.error("Failed to parse JSON")
      }
    }

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error)
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div className="p-4 space-y-4 w-full">
      <h1 className="text-5xl font-bold">Vote</h1>
    </div>
  )
}

export default VoteApp
