import clsx from "clsx"
import { FC } from "react"
import { ScoreState } from "./types"

const Scoreboard: FC<{ score: ScoreState[]; activeQuestionIndex: number }> = ({
  score,
  activeQuestionIndex,
}) => {
  return (
    <div className="flex justify-center space-x-2">
      {score.map((state, index) => (
        <div
          key={index}
          className={clsx(
            "w-4 h-4 rounded-full",
            index === activeQuestionIndex && "ring-8 ring-blue-700 bg-white",
            state === ScoreState.Upcoming && "bg-gray-400",
            state === ScoreState.Correct && "bg-green-500",
            state === ScoreState.Incorrect && "bg-red-500"
          )}
        />
      ))}
    </div>
  )
}

export default Scoreboard
