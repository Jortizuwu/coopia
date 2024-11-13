import { useListStatistics } from '@/shared/hooks/react-query/statistics'
import DownloadComponent from './components/download'
import MainHomeComponent from './components/main'
import SearchComponent from './components/search'
import { useMemo, useState } from 'react'
import {
  formatAsPercentage,
  formatNumberCOP,
} from '@/shared/utils/format-number'
import { BalanceChart } from './components/charts/balance'
import { columns } from './components/table/columns'

export default function HomePage() {
  const [searchStatisticsData, setSearchstatisticsData] = useState<{
    date: string
    agencie: string
  }>({
    date: '2024-01-31',
    agencie: 'CONS',
  })

  const { statistics, isLoading } = useListStatistics(
    searchStatisticsData.date,
    searchStatisticsData.agencie,
  )

  const columnsActive = useMemo(() => {
    return statistics?.active?.map(statistic => {
      return {
        ...statistic,
        currentBalance: formatNumberCOP.format(statistic.currentBalance) ?? '0',
        percentageVariation:
          formatAsPercentage(statistic.percentageVariation) ?? '0',
        previousBalance:
          formatNumberCOP.format(statistic.previousBalance) ?? '0',
        description: statistic.description ?? '',
      }
    })
  }, [statistics])

  const columnsInactive = useMemo(() => {
    return statistics?.passives?.map(statistic => {
      return {
        ...statistic,
        currentBalance: formatNumberCOP.format(statistic.currentBalance) ?? '0',
        percentageVariation:
          formatAsPercentage(statistic.percentageVariation) ?? '0',
        previousBalance:
          formatNumberCOP.format(statistic.previousBalance) ?? '0',
        description: statistic.description ?? '',
      }
    })
  }, [statistics])

  const totalBalance = useMemo(() => {
    return {
      actives: statistics?.active?.reduce(
        (acc, curr) => acc + curr.currentBalance,
        0,
      ),
      passives: statistics?.passives?.reduce(
        (acc, curr) => acc + curr.currentBalance,
        0,
      ),
    }
  }, [statistics])

  const headers = useMemo(() => {
    return [
      searchStatisticsData.date.split('-')[0],
      String(Number(searchStatisticsData.date.split('-')[0]) - 1),
      'VAR%',
    ]
  }, [searchStatisticsData.date])

  const columnsActiveHeaders = useMemo(() => {
    return columns(['Activo', ...headers])
  }, [headers])

  const columnsPasivosHeaders = useMemo(() => {
    return columns(['Pasivo', ...headers])
  }, [headers])

  return (
    <section className="flex h-full w-full flex-col">
      <section className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <DownloadComponent />
        <SearchComponent setSearchStatisticsData={setSearchstatisticsData} />
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-[50vh]">
            Loading...
          </div>
        ) : (
          <section>
            <section>
              <h2 className="mb-4 font-bold text-2xl">Activos</h2>
              <MainHomeComponent
                statistics={columnsActive || []}
                columns={columnsActiveHeaders}
              />
            </section>
            <section>
              <h2 className="mb-4 font-bold text-2xl">Pasivos</h2>
              <MainHomeComponent
                statistics={columnsInactive || []}
                columns={columnsPasivosHeaders}
              />
            </section>
            <section className="mb-4 w-full">
              <h2 className="font-bold text-2xl">Balance</h2>
              <section className="grid grid-cols-2 mt-4 items-center gap-4 w-full">
                <BalanceChart
                  balance={totalBalance}
                  date={searchStatisticsData.date}
                />
              </section>
            </section>
          </section>
        )}
      </section>
    </section>
  )
}
