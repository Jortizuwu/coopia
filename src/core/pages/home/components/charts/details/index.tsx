// import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/components/ui/chart'

export const description = 'A bar chart with an active bar'

const chartConfig = {
  initDate: {
    label: 'fecha de inicio',
    color: 'hsl(var(--chart-1))',
  },
  finishDate: {
    label: 'fecha de fin',
    color: 'hsl(var(--chart-2))',
  },
  variation: {
    label: 'variacion',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

interface Props {
  date: string
  data: {
    name: string
    initDate: number
    variation: number
    finishDate: number
  }[]
}

export function DetailsChart({ date, data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ESTADOS DE RESULTADO</CardTitle>
        <CardDescription>
          {date.split('-')[0] + ' - ' + String(Number(date.split('-')[0]) - 1)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data} layout="vertical">
            <CartesianGrid horizontal={false} />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              width={150}
              axisLine={false}
            />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="initDate" fill="#F0A8D0" radius={10} />
            <Bar dataKey="finishDate" fill="#640D5F" radius={4} />
            <Bar dataKey="variation" fill="#FFDA78" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none"></div>
      </CardFooter>
    </Card>
  )
}
