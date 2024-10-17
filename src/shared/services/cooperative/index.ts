import { api } from '@/shared/common/api'
import { ICooperativeResponse } from './index.model'

const CooperativeServices = {
  listCooperatives: async (date: string, type: 'CONS', status: boolean) => {
    const req = await api.get<ICooperativeResponse[]>(
      `/cooperative/dashboard/${date}/${type}/${status}`,
    )
    const cooperatives = req.data
    return cooperatives
  },
}

export default CooperativeServices
