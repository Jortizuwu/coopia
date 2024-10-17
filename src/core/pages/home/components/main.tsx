import { tasks } from './data/tasks'
import { columns } from './table/columns'
import { DataTable } from './table/data-table'

function MainHomeComponent() {
  return (
    <div className="w-full">
      <DataTable data={tasks} columns={columns} />
    </div>
  )
}

export default MainHomeComponent
