import { useEffect, useState } from "react"
import { Vote, RELAY_SERVER_EVENTS, ResponseSchema, Party } from "./common"
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
  PieChart,
  Pie,
} from "recharts"

const colors: Record<Party, string> = {
  CDU: "#000",
  AFD: "#0000ff",
  SPD: "#ff0000",
  GRUENE: "#008000",
  BSW: "#7b2450",
  FDP: "#ffff00",
  LINKE: "#ff00ff",
  SONSTIGE: "#c0c0c0",
}

function StatisticsApp() {
  const [data, setData] = useState<Vote[]>([])

  useEffect(() => {
    console.log("Connecting to EventSource: ", `${RELAY_SERVER_EVENTS}`)

    const eventSource = new EventSource(RELAY_SERVER_EVENTS)

    eventSource.onmessage = (event) => {
      console.log("Received event:", event.data)

      try {
        JSON.parse(event.data)
        const parsedData = JSON.parse(event.data)
        const { success, data, error } = ResponseSchema.safeParse(parsedData)

        if (!success) {
          console.error("Failed to parse", parsedData, error)
          return
        }

        switch (data.type) {
          case "complete":
            console.log("Received complete data")
            setData(data.votes)
            break
          case "partial":
            console.log("Received partial data")
            setData((oldData) => [...(oldData ?? []), data.vote])
            break
          case "info":
            console.log("Received info data")
            console.info(data.msg)
            break
          default:
            console.error("Unknown response type")
        }
      } catch {
        console.error("Failed to parse JSON")
      }
    }

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error)
    }

    return () => {
      eventSource.close()
    }
  }, [])

  const partyMap = new Map<Party, number>()
  data.forEach((vote) => {
    const current = partyMap.get(vote.party) ?? 0
    partyMap.set(vote.party, current + 1)
  })

  const chartData = Array.from(partyMap.entries()).map(([party, count]) => ({
    party,
    percentage: (count / data.length) * 100,
  }))

  chartData.sort((a, b) => b.percentage - a.percentage)
  return (
    <div className="p-4 space-y-4 w-full">
      <h1 className="text-5xl font-bold">Statistics</h1>

      <ResponsiveContainer width="100%" height={800}>
        <BarChart
          data={chartData}
          margin={{ top: 0, right: 10, left: 50, bottom: 50 }}>
          <XAxis dataKey="party" />
          <YAxis tickFormatter={(value) => `${value}%`} />
          <Bar dataKey="percentage" fill="#8884d8">
            <LabelList
              dataKey="percentage"
              position="top"
              formatter={(value: unknown) => `${Number(value).toFixed(2)}%`}
              fill="#000"
            />
            {chartData.map((entry, index) => {
              console.log(entry, index)
              return <Cell key={`cell-${index}`} fill={colors[entry.party]} />
            })}
          </Bar>
          <ReferenceLine y={5} stroke="red" strokeWidth={5}>
            <Label
              value="5%"
              position="insideBottomRight"
              fill="black"
              stroke="black"
            />
          </ReferenceLine>
        </BarChart>
      </ResponsiveContainer>

      <div className="w-full h-96">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="percentage"
              fill="#8884d8"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={500}
              strokeWidth={0}>
              {chartData.map((entry, index) => {
                console.log(entry, index)
                return <Cell key={`cell-${index}`} fill={colors[entry.party]} />
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default StatisticsApp
