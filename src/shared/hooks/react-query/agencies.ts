import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/common/query-keys'
import AgenciesServices from '@/shared/services/agencies'

export function useListAgencies() {
  const { data: agencies, isLoading } = useQuery(
    [QUERY_KEYS.AGENCIES],
    () => AgenciesServices.listAgencies(),
    {
      refetchOnWindowFocus: false,
    },
  )
  return {
    agencies,
    isLoading,
  }
}
