import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/common/query-keys'
import StatisticsServices from '@/shared/services/statistics'

export function useListStatistics(date: string, type: string, comparation:string) {
  const {
    data: statistics,
    isLoading,
    isFetched,
  } = useQuery(
    [QUERY_KEYS.STATISTICS, date, type, comparation],
    () => StatisticsServices.listStatistics(date, type,comparation),
    {
      refetchOnWindowFocus: false,
      enabled: date !== '' && type !== '' && comparation !== '', 
    },
  )
  return {
    statistics,
    isLoading,
    isFetched,
  }
}
