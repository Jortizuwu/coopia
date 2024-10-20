import { useListStatistics } from '@/shared/hooks/react-query/statistics'
import DownloadComponent from './components/download'
import MainHomeComponent from './components/main'
import SearchComponent from './components/search'
import { useMemo, useState } from 'react'

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
    searchStatisticsData.active,
  )

  const columns = useMemo(() => {
    return statistics?.map(statistic => {
      return {
        ...statistic,
        currentBalance: statistic.currentBalance ?? 0,
        percentageVariation: statistic.percentageVariation ?? 0,
        previousBalance: statistic.previousBalance ?? 0,
        description: statistic.description ?? '',
      }
    })
  }, [statistics])

  return (
    <section className="flex min-h-screen w-full flex-col">
      <section className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <DownloadComponent />
        <SearchComponent setSearchStatisticsData={setSearchstatisticsData} />
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-[50vh]">
            Loading...
          </div>
        ) : (
          <MainHomeComponent statistics={columns || []} />
        )}
      </section>
    </section>
  )
}
