export enum ScoreState {
  Upcoming,
  Correct,
  Incorrect,
}

export type Question = {
  frage: string
  antworten: string[]
  korrekte_antwort: number
}
