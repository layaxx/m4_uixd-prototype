import { useCallback, useEffect, useState } from "react"
import questions from "./data/questions"
import Scoreboard from "./ScoreBoard"
import { ScoreState } from "./types"
import QuestionComponent from "./Question"
import type { Question } from "./types"

function shuffleTakeN<T>(input: T[], n: number = 5): T[] {
  return input
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, n)
}

function App() {
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(
    shuffleTakeN(questions)
  )
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [score, setScore] = useState(
    activeQuestions.map(() => ScoreState.Upcoming)
  )

  function reset() {
    setActiveQuestions(shuffleTakeN(questions))
    setActiveQuestionIndex(0)
    setScore(activeQuestions.map(() => ScoreState.Upcoming))
  }

  const registerAnswer = useCallback(
    (answerIndex: number) => {
      if (
        answerIndex === activeQuestions[activeQuestionIndex].korrekte_antwort
      ) {
        setScore((prev) =>
          prev.map((state, index) =>
            index === activeQuestionIndex ? ScoreState.Correct : state
          )
        )
      } else {
        setScore((prev) =>
          prev.map((state, index) =>
            index === activeQuestionIndex ? ScoreState.Incorrect : state
          )
        )
      }

      setActiveQuestionIndex((prev) => prev + 1)
    },
    [activeQuestionIndex, activeQuestions]
  )

  useEffect(() => {
    console.log(
      "Connecting to EventSource: ",
      `${import.meta.env.VITE_RELAY_SERVER ?? "http://localhost:3010"}/events`
    )

    const eventSource = new EventSource(
      `${import.meta.env.VITE_RELAY_SERVER ?? "http://localhost:3010"}/events`
    )

    eventSource.onmessage = (event) => {
      console.log("Received event:", event.data)

      try {
        JSON.parse(event.data)
        const parsedData = JSON.parse(event.data)

        if (parsedData.type === "reset") {
          reset()
        } else if (parsedData.type === "answer") {
          const msgNumber = Number.parseInt(parsedData.msg, 10)
          if (!Number.isNaN(msgNumber)) {
            registerAnswer(msgNumber)
          }
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
  }, [registerAnswer])

  return (
    <div className="p-4 space-y-4 w-full">
      <h1 className="text-5xl font-bold">
        Quiz zur <br />
        Bundestagswahl
      </h1>
      <Scoreboard score={score} activeQuestionIndex={activeQuestionIndex} />
      {activeQuestionIndex < activeQuestions.length && (
        <QuestionComponent
          {...activeQuestions[activeQuestionIndex]}
          registerAnswer={registerAnswer}
        />
      )}
      {activeQuestionIndex >= activeQuestions.length && (
        <div className="w-full flex flex-col space-y-4">
          <h2 className="text-2xl">Danke fürs Teilnehmen!</h2>
          <button
            className="bg-blue-100 mx-auto p-4 border-8 border-blue-600"
            onClick={() => reset()}>
            Neu starten
          </button>
        </div>
      )}
    </div>
  )
}

export default App
