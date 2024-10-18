import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/common/query-keys'
import StatisticsServices from '@/shared/services/statistics'

export function useListStatistics(date: string, type: string, status: string) {
  const { data: statistics, isLoading } = useQuery(
    [QUERY_KEYS.STATISTICS, date, type, status],
    () => StatisticsServices.listStatistics(date, type, status),
    {
      refetchOnWindowFocus: false,
    },
  )
  return {
    statistics,
    isLoading,
  }
}
