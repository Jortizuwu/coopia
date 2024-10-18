import { IStatistics } from '@/shared/services/statistics/index.model'
import { columns } from './table/columns'
import { DataTable } from './table/data-table'

function MainHomeComponent({ statistics }: { statistics: IStatistics[] }) {
  return (
    <div className="w-full">
      <DataTable data={statistics} columns={columns} />
    </div>
  )
}

export default MainHomeComponent
