import { api } from '@/shared/common/api'
import { IStatistics } from './index.model'

const statisticServices = {
  listStatistics: async (date: string, type: string, comparation: string) => {
    const comparationValue = comparation === 'Mes' ? 'month' : 'year'
    const res = await Promise.all([
      api.get<IStatistics[]>(
        `/cooperative/dashboard/${date}/${type}/false/${comparationValue}`,
      ),
      api.get<IStatistics[]>(
        `/cooperative/dashboard/${date}/${type}/true/${comparationValue}`,
      ),
      api.get<IStatistics[]>(
        `/cooperative/dashboard/second/${date}/${type}/${comparationValue}`,
      ),
    ])

    const statistics = {
      passives: res[0].data,
      active: res[1].data,
      second: res[2].data,
    }
    return statistics
  },
}

export default statisticServices
