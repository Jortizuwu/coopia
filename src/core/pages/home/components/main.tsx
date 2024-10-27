import { columns } from './table/columns'
import { DataTable } from './table/data-table'

export interface IStatisticsColumns {
  id: string
  currentBalance: string
  previousBalance: string
  percentageVariation: string
  description: string
}

function MainHomeComponent({
  statistics,
}: {
  statistics: IStatisticsColumns[]
}) {
  return (
    <div className="w-full">
      <DataTable data={statistics} columns={columns} />
    </div>
  )
}

export default MainHomeComponent
