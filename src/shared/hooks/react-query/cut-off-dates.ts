import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/common/query-keys'
import CutOffDatesServices from '@/shared/services/cut-off-dates'

export function useListCutOfDates() {
  const { data: cutOfDates, isLoading } = useQuery(
    [QUERY_KEYS.CUT_OFF_DATES],
    () => CutOffDatesServices.listDates(),
    {
      refetchOnWindowFocus: false,
    },
  )
  return {
    cutOfDates,
    isLoading,
  }
}
