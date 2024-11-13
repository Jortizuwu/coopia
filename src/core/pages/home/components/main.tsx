import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './table/data-table'
import { Statistics } from './data/schema'

export interface IStatisticsColumns {
  id: string
  currentBalance: string
  previousBalance: string
  percentageVariation: string
  description: string
}

function MainHomeComponent({
  statistics,
  columns,
}: {
  columns: ColumnDef<Statistics>[]
  statistics: IStatisticsColumns[]
}) {
  return (
    <div className="w-full">
      <DataTable data={statistics} columns={columns} />
    </div>
  )
}

export default MainHomeComponent
