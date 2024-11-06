import { api } from '@/shared/common/api'
import { IStatistics } from './index.model'

const statisticServices = {
  listStatistics: async (date: string, type: string) => {
    const req = await Promise.all([
      api.get<IStatistics[]>(`/cooperative/dashboard/${date}/${type}/false`),
      api.get<IStatistics[]>(`/cooperative/dashboard/${date}/${type}/true`),
    ])

    const statistics = {
      passives: req[0].data,
      active: req[1].data,
    }
    return statistics
  },
}

export default statisticServices
