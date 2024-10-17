import { ICooperativeResponse } from '@/shared/services/cooperative/index.model'
import { columns } from './table/columns'
import { DataTable } from './table/data-table'

function MainHomeComponent({
  cooperatives,
}: {
  cooperatives: ICooperativeResponse[]
}) {
  return (
    <div className="w-full">
      <DataTable data={cooperatives} columns={columns} />
    </div>
  )
}

export default MainHomeComponent
