import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { Statistics } from '../data/schema'
import { priorities } from '../data/data'

export const columns = (titles: string[]): ColumnDef<Statistics>[] => {
  return [
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={titles[0].toLocaleUpperCase()}
          className="translate-x-[10px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center translate-x-[10px]">
            <span>{row.getValue('description')}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: 'currentBalance',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={'AÑO ' + titles[1]} />
      ),
      cell: ({ row }) => {
        const priority = priorities.find(priority =>
          !(row.getValue('currentBalance') as string).includes('-')
            ? priority.value === 'high'
            : priority.value === 'low',
        )

        if (!priority) {
          return null
        }

        return (
          <div className="flex space-x-2 ">
            {priority.icon && (
              <priority.icon
                className={`mr-2 h-4 w-4 text-muted-foreground ${priority.value === 'low' ? 'text-red-500' : 'text-[#00FF9C]'}`}
              />
            )}
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue('currentBalance')}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'previousBalance',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={'AÑO ' + titles[2]} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-[100px] items-center">
            <span>{row.getValue('previousBalance')}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: 'percentageVariation',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={titles[3]} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span>{row.getValue('percentageVariation')}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
  ]
}
