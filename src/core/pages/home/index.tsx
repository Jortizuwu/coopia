import { useListStatistics } from '@/shared/hooks/react-query/statistics'
import DownloadComponent from './components/download'
import MainHomeComponent from './components/main'
import SearchComponent from './components/search'
import { useMemo, useState } from 'react'
import {
  formatAsPercentage,
  formatNumberCOP,
} from '@/shared/utils/format-number'

export default function HomePage() {
  const [searchStatisticsData, setSearchstatisticsData] = useState<{
    date: string
    agencie: string
    active: string
  }>({
    date: '2024-01-31',
    agencie: 'CONS',
    active: 'false',
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
    return statistics?.inactive?.map(statistic => {
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
              <MainHomeComponent statistics={columnsActive || []} />
            </section>
            <section>
              <h2 className="mb-4 font-bold text-2xl">Pasivos</h2>
              <MainHomeComponent statistics={columnsInactive || []} />
            </section>
          </section>
        )}
      </section>
    </section>
  )
}
