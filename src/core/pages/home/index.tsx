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
// import { DetailsChart } from './components/charts/details'

export default function HomePage() {
  const [searchStatisticsData, setSearchstatisticsData] = useState<{
    date: string
    agencie: string
    comparation: string
  }>({
    date: '2024-01-31',
    agencie: 'CONS',
    comparation: 'Mes',
  })

  const { statistics, isLoading } = useListStatistics(
    searchStatisticsData.date,
    searchStatisticsData.agencie,
    searchStatisticsData.comparation,
  )

  const columnsActive = useMemo(() => {
    return statistics?.active
      ?.map(statistic => {
        return {
          ...statistic,
          currentBalance:
            formatNumberCOP.format(statistic.currentBalance) ?? '0',
          percentageVariation:
            formatAsPercentage(statistic.percentageVariation) ?? '0',
          previousBalance:
            formatNumberCOP.format(statistic.previousBalance) ?? '0',
          description: statistic.description ?? '',
        }
      })
      .sort((a, b) => Number(a.id) - Number(b.id))
  }, [statistics])

  const columnsInactive = useMemo(() => {
    return statistics?.passives
      ?.map(statistic => {
        return {
          ...statistic,
          currentBalance:
            formatNumberCOP.format(statistic.currentBalance) ?? '0',
          percentageVariation:
            formatAsPercentage(statistic.percentageVariation) ?? '0',
          previousBalance:
            formatNumberCOP.format(statistic.previousBalance) ?? '0',
          description: statistic.description ?? '',
        }
      })
      .sort((a, b) => Number(a.id) - Number(b.id))
  }, [statistics])

  const columnsSecond = useMemo(() => {
    return statistics?.second
      ?.map(statistic => {
        return {
          ...statistic,
          currentBalance:
            formatNumberCOP.format(statistic.currentBalance) ?? '0',
          percentageVariation:
            formatAsPercentage(statistic.percentageVariation) ?? '0',
          previousBalance:
            formatNumberCOP.format(statistic.previousBalance) ?? '0',
          description: statistic.description ?? '',
        }
      })
      .sort((a, b) => Number(a.id) - Number(b.id))
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

  // const dataDetails = useMemo(() => {
  //   return statistics?.second.map(statistic => {
  //     return {
  //       name: statistic.description,
  //       initDate: statistic.previousBalance,
  //       finishDate: statistic.currentBalance,
  //       variation: statistic.percentageVariation,
  //     }
  //   })
  // }, [statistics])

  const headers = useMemo(() => {
    return [
      String(Number(searchStatisticsData.date.split('-')[0]) - 1),
      searchStatisticsData.date.split('-')[0],
      'VAR%',
    ]
  }, [searchStatisticsData.date])

  const columnsActiveHeaders = useMemo(() => {
    return columns(['Activo', ...headers])
  }, [headers])

  const columnsPasivosHeaders = useMemo(() => {
    return columns(['Pasivo', ...headers])
  }, [headers])

  const columnsSecondHeaders = useMemo(() => {
    return columns(['Detalle', ...headers])
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
            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
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
            </div>
            <section className="mb-4 w-full">
              <section className="grid grid-cols-2 mt-4 items-start gap-4 w-full">
                <section>
                  <h2 className="mb-4 font-bold text-2xl">Detalle</h2>
                  <MainHomeComponent
                    statistics={columnsSecond || []}
                    columns={columnsSecondHeaders}
                  />
                </section>
                <div>
                  <h2 className="font-bold text-2xl mb-4">Balance</h2>
                  <BalanceChart
                    balance={totalBalance}
                    date={searchStatisticsData.date}
                  />
                </div>
              </section>
              {/* <div>
                <h2 className="font-bold text-2xl mt-5 mb-2">
                  ESTADOS DE RESULTADO
                </h2>
                <DetailsChart
                  date={searchStatisticsData.date}
                  data={dataDetails || []}
                />
              </div> */}
            </section>
          </section>
        )}
      </section>
    </section>
  )
}
