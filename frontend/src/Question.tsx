import { FC } from "react"
import type { Question } from "./types"

const Question: FC<Question & { registerAnswer: (arg: number) => void }> = ({
  frage,
  antworten,
  registerAnswer,
}) => {
  return (
    <>
      <h2 className="text-3xl font-bold text-balance">{frage}</h2>

      <div className="text-xl grid grid-cols-2 gap-4 font-bold text-white">
        {antworten.map((antwort, index) => (
          <button
            className="bg-blue-400 rounded-lg p-4"
            onClick={() => registerAnswer(index)}>
            {antwort}
          </button>
        ))}
      </div>
    </>
  )
}

export default Question
