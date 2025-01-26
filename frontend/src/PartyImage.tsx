import { FC } from "react"
import { Party } from "./common"

const PartyImage: FC<{ party: Party }> = ({ party }) => {
  if (party === Party.SONSTIGE) return null

  return (
    <img
      src={`/logos/${party.toLowerCase()}.png`}
      alt={party}
      className="mx-auto"
      height="auto"
      width="100%"
    />
  )
}

export default PartyImage
