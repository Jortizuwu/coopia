import { Button } from '@/shared/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { CalendarIcon, Search } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import { format } from 'date-fns'
import { cn } from '@/shared/lib/utils'
import { Calendar } from '@/shared/components/ui/calendar'
import { useState } from 'react'

const types = [
  {
    id: 1,
    label: 'CONS',
    value: 'CONS',
  },
]

const actives = [
  {
    id: 1,
    label: 'Activo',
    value: 'true',
  },
  {
    id: 2,
    label: 'Inactivo',
    value: 'false',
  },
]

type SearchProps = {
  setSearchCooperativeDate: React.Dispatch<
    React.SetStateAction<{
      date: string
      type: 'CONS'
      active: boolean
    }>
  >
}

type Type = 'CONS'

function SearchComponent({ setSearchCooperativeDate }: SearchProps) {
  const [date, setDate] = useState<Date>()
  const [active, setActive] = useState('true')
  const [type, setType] = useState<Type>('CONS')

  const onClickSearch = () => {
    setSearchCooperativeDate({
      date: format(date!, 'yyyy-MM-dd'),
      type,
      active: active === 'true',
    })
  }

  return (
    <div className="flex flex-row gap-4 max-w-[500px]">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, 'PPP')
            ) : (
              <span className="text-white">fecha</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Select>
        <SelectTrigger id="type">
          <SelectValue placeholder="tipo" />
        </SelectTrigger>
        <SelectContent>
          {types.map(type => (
            <SelectItem
              key={type.id}
              value={type.value}
              onChange={() => setType(type.value as Type)}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger id="active">
          <SelectValue placeholder="activo" />
        </SelectTrigger>
        <SelectContent>
          {actives.map(type => (
            <SelectItem
              key={type.id}
              value={type.value}
              onChange={() => setActive(type.value)}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button className="w-full" onClick={onClickSearch}>
        <Search className="mr-2 h-4 w-4" />
        buscar
      </Button>
    </div>
  )
}

export default SearchComponent
