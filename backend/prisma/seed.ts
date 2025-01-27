import { PrismaClient, Prisma, Party } from "@prisma/client"

const prisma = new PrismaClient()

const NUMBER_OF_VOTES = 20

/* 	                Cumulative
CSU         30,2%	
AfD	        20,2%	50.4
SPD	        16,5%	66.9
Grüne       13,6%	80.5
BSW	        5,0%	85.5
FDP	        3,9%	89.4
Linke	    3,7%	93.1
Sonstige	6,9%	100 */
const makeVoteFromDistribution = (): Prisma.VoteCreateInput => {
  const random = Math.random()

  let party: Party = Party.SONSTIGE
  if (random < 0.302) {
    party = Party.CDU
  } else if (random < 0.504) {
    party = Party.AFD
  } else if (random < 0.669) {
    party = Party.SPD
  } else if (random < 0.805) {
    party = Party.GRUENE
  } else if (random < 0.855) {
    party = Party.BSW
  } else if (random < 0.894) {
    party = Party.FDP
  } else if (random < 0.931) {
    party = Party.LINKE
  }
  return { party, cardID: "seeding" }
}

async function main() {
  console.log(`Start seeding ...`)
  const deletionResult = await prisma.vote.deleteMany()
  console.log(`Deleted ${deletionResult.count} votes.`)

  const x = await prisma.vote.createMany({
    data: Array.from({ length: NUMBER_OF_VOTES }, () =>
      makeVoteFromDistribution()
    ),
  })

  console.log(`Created ${x.count} votes.\nSeeding finished.`)
}

main()
  .catch(async (error) => {
    console.error(error)
  })
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .finally(async () => await prisma.$disconnect())
