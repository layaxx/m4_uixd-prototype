import { Party, Vote } from "./common"
import PartyImage from "./PartyImage"

function prettyName(party: Party): string {
  switch (party) {
    case Party.CDU:
      return "die CDU/CSU"
    case Party.AFD:
      return "die AfD"
    case Party.SPD:
      return "die SPD"
    case Party.GRUENE:
      return "die Grünen"
    case Party.BSW:
      return "das Bündnis Sarah Wagenknecht"
    case Party.FDP:
      return "die FDP"
    case Party.LINKE:
      return "die Linke"
    case Party.FW:
      return "die Freien Wähler"
    case Party.SONSTIGE:
      return "eine der sonstige Parteien"
  }
}

const VoteComponent = (props: Vote) => {
  return (
    <div className="flex flex-col items-stretch flex-grow">
      <p className="text-center text-6xl mt-4 font-bold">
        Vielen Dank für Ihre Teilnahme!
      </p>
      <div className="mx-auto pt-10 grow">
        <PartyImage party={props.party} />
      </div>
      <p className="text-center text-4xl pb-4">
        Sie haben für{" "}
        <span className="font-bold">{prettyName(props.party)}</span> gestimmt!
      </p>
    </div>
  )
}

export default VoteComponent
