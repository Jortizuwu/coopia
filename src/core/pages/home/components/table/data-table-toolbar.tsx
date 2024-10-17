import { Input } from '@/shared/components/ui/input'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { Button } from '@/shared/components/ui/button'
import { DataTableViewOptions } from './data-table-view-options'

import { priorities } from '../data/data'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar por descripción..."
          value={(table.getColumn('description')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('description')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('currentBalance') && (
          <DataTableFacetedFilter
            column={table.getColumn('currentBalance')}
            title="Saldo actual"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
