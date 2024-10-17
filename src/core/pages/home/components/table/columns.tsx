import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { Cooperative } from '../data/schema'
import { priorities } from '../data/data'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Cooperative>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'currentBalance',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Saldo actual" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(priority =>
        (row.getValue('currentBalance') as number) >= 0
          ? priority.value === 'high'
          : priority.value === 'low',
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex space-x-2">
          {priority.icon && (
            <priority.icon
              className={`mr-2 h-4 w-4 text-muted-foreground ${priority.value === 'low' ? 'text-red-500' : 'text-green-500'}`}
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
      <DataTableColumnHeader column={column} title="Saldo anterior" />
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
      <DataTableColumnHeader column={column} title="Variacion porcentual" />
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

  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripcion" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue('description')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
