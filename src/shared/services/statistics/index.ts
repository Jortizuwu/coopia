import { api } from '@/shared/common/api'
import { IStatistics } from './index.model'

const statisticServices = {
  listStatistics: async (date: string, type: string, status: string) => {
    const req = await api.get<IStatistics[]>(
      `/dashboard/${date}/${type}/${status}`,
    )
    const statistics = req.data
    return statistics
  },
}

export default statisticServices
