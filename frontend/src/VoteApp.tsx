import { useEffect, useRef, useState } from "react"
import { RELAY_SERVER_EVENTS, ResponseSchema, Vote } from "./common"
import VoteComponent from "./Vote"

const VOTE_CLEAR_TIMEOUT = 5000

function VoteApp() {
  const [activeVote, setActiveVote] = useState<Vote | null>(null)
  const timeout = useRef<NodeJS.Timeout | null>(null)

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
          console.error("Failed to parse", parsedData, error)
          return
        }

        switch (data.type) {
          case "complete":
            console.log("Received complete data, ignoring")
            break
          case "partial":
            console.log("Received partial data")
            setActiveVote(data.vote)
            if (timeout.current) {
              clearTimeout(timeout.current)
            }
            timeout.current = setTimeout(() => {
              setActiveVote(null)
            }, VOTE_CLEAR_TIMEOUT)

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
      <h1 className="text-5xl font-bold">der ZOB wählt</h1>

      <p>
        Um an der Umfrage teilzunehmen, einfach eine der Karten kurz in die Urne
        stecken und dann zurücklegen, um für die entsprechende Partei
        abzustimmen.
      </p>

      {activeVote && <VoteComponent {...activeVote} />}
    </div>
  )
}

export default VoteApp
