import { FC } from "react"
import { Party } from "./common"

const PartyImage: FC<{ party: Party }> = ({ party }) => {
  if (party === Party.SONSTIGE) return null

  return (
    <img
      src={`/logos/${party.toLowerCase()}.png`}
      alt={party}
      className="mx-auto"
      height="400"
      width="auto"
    />
  )
}

export default PartyImage
