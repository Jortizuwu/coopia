// import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis } from 'recharts'

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
import { formatNumberCOP } from '@/shared/utils/format-number'

export const description = 'A bar chart with an active bar'

const chartConfig = {
  visitors: {
    label: 'Balance',
  },
  actives: {
    label: 'Activos',
    color: 'hsl(var(--chart-1))',
  },
  passives: {
    label: 'Pasivos',
    color: 'hsl(var(--chart-2))',
  },
  patrimonio: {
    label: 'Patrimonio',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig

interface Props {
  date: string
  balance: {
    actives: number | undefined
    passives: number | undefined
  }
}

export function BalanceChart({ date, balance }: Props) {
  const chartData = [
    {
      balance: 'actives',
      totales: balance.actives,
      fill: 'var(--color-actives)',
    },
    {
      balance: 'passives',
      totales: balance.passives,
      fill: 'var(--color-passives)',
    },
    {
      balance: 'patrimonio',
      totales:
        balance.actives && balance.passives
          ? balance.actives - balance.passives
          : 0,
      fill: 'var(--color-patrimonio)',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>ACTIVOS, PASIVOS Y PATRIMONIO</CardTitle>
        <CardDescription>
          {date.split('-')[0] + ' - ' + String(Number(date.split('-')[0]) - 1)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <YAxis
              type="number"
              accentHeight={100}
              width={150}
              tickFormatter={value => formatNumberCOP.format(value as number)}
            />
            <XAxis
              dataKey="balance"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="totales"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {/* Trending up by 5.2% this month1 */}
        </div>
      </CardFooter>
    </Card>
  )
}
