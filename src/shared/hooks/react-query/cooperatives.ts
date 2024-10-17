import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/common/query-keys'
import CooperativeServices from '@/shared/services/cooperative'

export function useListCooperatives(
  date: string,
  type: 'CONS',
  status: boolean,
) {
  const { data: cooperatives, isLoading } = useQuery(
    [QUERY_KEYS.COOPERATIVES, date, type, status],
    () => CooperativeServices.listCooperatives(date, type, status),
    {
      refetchOnWindowFocus: false,
    },
  )
  return {
    cooperatives: cooperatives && cooperatives?.length > 1 ? cooperatives : [],
    isLoading,
  }
}
