import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/common/query-keys'
import StatisticsServices from '@/shared/services/statistics'

export function useListStatistics(date: string, type: string) {
  const {
    data: statistics,
    isLoading,
    isFetched,
  } = useQuery(
    [QUERY_KEYS.STATISTICS, date, type],
    () => StatisticsServices.listStatistics(date, type),
    {
      refetchOnWindowFocus: false,
      enabled: date !== '' && type !== '',
    },
  )
  return {
    statistics,
    isLoading,
    isFetched,
  }
}
