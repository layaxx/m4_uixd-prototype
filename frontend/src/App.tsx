import { useEffect, useState } from "react"
import questions from "./data/questions"
import Scoreboard from "./ScoreBoard"
import { ScoreState } from "./types"
import QuestionComponent from "./Question"
import type { Question } from "./types"

function shuffle<T>(input: T[]): T[] {
  return input
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

function App() {
  const [messages, setMessages] = useState("")
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(
    shuffle(questions)
  )
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [score, setScore] = useState(questions.map(() => ScoreState.Upcoming))

  function reset() {
    setActiveQuestions(shuffle(questions))
    setActiveQuestionIndex(0)
    setScore(questions.map(() => ScoreState.Upcoming))
  }

  function registerAnswer(answerIndex: number) {
    if (answerIndex === activeQuestions[activeQuestionIndex].korrekte_antwort) {
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
  }

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
    <div className="p-4 space-y-4">
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
        <>
          <h2>Danke fürs Teilnehmen!</h2>
          <button onClick={() => reset()}>Neu starten</button>
        </>
      )}
    </div>
  )
}

export default App
