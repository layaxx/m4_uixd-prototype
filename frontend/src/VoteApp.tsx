import { useEffect, useRef, useState } from "react"
import { RELAY_SERVER_EVENTS, ResponseSchema, Vote } from "./common"
import VoteComponent from "./VoteRegisteredComponent"
import BouncingBallot from "./BouncingBallot"

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
    <div className="space-y-4 w-full flex flex-col h-screen">
      <div className="bg-yellow-200 text-center p-4 pb-6">
        <h1 className="text-7xl font-bold">
          der <span className="text-green-600 font-black">ZOB</span> wählt!
        </h1>
        <h2 className="text-4xl font-bold">Umfrage zur Bundestagswahl</h2>
      </div>

      <div className="flex flex-col items-center space-y-4 pt-2">
        <h2 className="text-5xl text-center font-bold">
          Jetzt hier abstimmen!
        </h2>
        <img
          src="/down-arrow-svgrepo-com.svg"
          alt="down arrow"
          className="w-1/3"
        />
      </div>

      <div className="pt-40 px-4 grow flex flex-col">
        <p className="text-2xl px-4">
          Um an der Umfrage teilzunehmen: einfach{" "}
          <span className="font-semibold">
            eine der Karten kurz in die Urne stecken und dann zurücklegen
          </span>
          , um für die entsprechende Partei abzustimmen.
        </p>

        {activeVote ? (
          <VoteComponent {...activeVote} />
        ) : (
          <div className="w-1/3 mx-auto flex-grow pt-10">
            <BouncingBallot />
          </div>
        )}
      </div>
      <p className="text-2xl text-center">
        Ergebnisse werden links am Display angezeigt
      </p>
    </div>
  )
}

export default VoteApp
