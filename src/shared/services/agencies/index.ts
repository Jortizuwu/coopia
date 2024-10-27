import { api } from '@/shared/common/api'

const agenciesServices = {
  listAgencies: async () => {
    const req = await api.get<string[]>(
      `/cooperative/agencies`,
    )
    const agencies = req.data
    return agencies
  },
}

export default agenciesServices
