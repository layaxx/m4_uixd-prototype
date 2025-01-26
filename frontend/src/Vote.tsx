import { Party, Vote } from "./common"

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
    case Party.SONSTIGE:
      return "eine der sonstige Parteien"
  }
}

const VoteComponent = (props: Vote) => {
  return (
    <div>
      <div className="mx-auto ">
        {props.party !== Party.SONSTIGE && (
          <img
            src={`/logos/${props.party.toLowerCase()}.png`}
            alt={props.party}
            className="mx-auto"
            height="auto"
            width="100%"
          />
        )}
      </div>
      <p className="text-center text-2xl">
        Sie haben für{" "}
        <span className="font-bold">{prettyName(props.party)}</span> gestimmt!
      </p>
      <p className="text-center text-xl mt-4">
        Vielen Dank für Ihre Teilnahme!
      </p>
    </div>
  )
}

export default VoteComponent
