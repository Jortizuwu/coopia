import { api } from '@/shared/common/api'

const cutoffdatesServices = {
  listDates: async () => {
    const req = await api.get<string[]>(
      `/cut-off-dates`,
    )
    const dates = req.data
    return dates
  },
}

export default cutoffdatesServices
