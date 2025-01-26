import { z } from "zod"

export const RELAY_SERVER =
  import.meta.env.VITE_RELAY_SERVER ?? "http://localhost:3010"

export const RELAY_SERVER_EVENTS = `${RELAY_SERVER}/events`

export enum ResponseType {
  COMPLETE_DATA = "complete",
  PARTIAL_DATA = "partial",
  INFO = "info",
}

export enum Party {
  CDU = "CDU",
  AFD = "AFD",
  SPD = "SPD",
  GRUENE = "GRUENE",
  BSW = "BSW",
  FDP = "FDP",
  LINKE = "LINKE",
  SONSTIGE = "SONSTIGE",
}

export const VoteSchema = z.object({
  id: z.number().min(0),
  party: z.nativeEnum(Party),
  cardID: z.string().min(3),
  createdAt: z.date({ coerce: true }),
})

export const ResponseSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("complete"),
    votes: z.array(VoteSchema),
  }),
  z.object({
    type: z.literal("partial"),
    vote: VoteSchema,
  }),
  z.object({
    type: z.literal("info"),
    msg: z.string(),
  }),
])

export type Vote = z.infer<typeof VoteSchema>
