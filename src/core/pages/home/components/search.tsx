import { useForm, UseFormReturn } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/shared/components/ui/button'

import { ChevronsUpDown, Search } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import { cn } from '@/shared/lib/utils'

import { Form, FormField, FormItem } from '@/shared/components/ui/form'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { useListAgencies } from '@/shared/hooks/react-query/agencies'
import { useListCutOfDates } from '@/shared/hooks/react-query/cut-off-dates'

interface SearchForm {
  date: string
  agencie: string
  comparation: string
}

type SearchProps = {
  setSearchStatisticsData: React.Dispatch<React.SetStateAction<SearchForm>>
}

const FormSchema = z.object({
  date: z.string({
    required_error: 'date required',
  }),
  agencie: z.string({
    required_error: 'type required',
  }),
  comparation: z.string({
    required_error: 'type required',
  }),
})

type FormType = z.infer<typeof FormSchema>

type From = UseFormReturn<FormType>

const ComboboxComponent = ({
  form,
  data,
  name,
  label,
}: {
  form: From
  data: string[]
  name: 'date' | 'agencie' | 'comparation'
  label: string
}) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[300px] justify-between">
                {value || `Seleccione una ${label}...`}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-0">
              <Command>
                <CommandInput placeholder="Buscar..." />
                <CommandList>
                  <CommandEmpty>Sin {label} disponibles</CommandEmpty>
                  <CommandGroup>
                    {data.map(v => (
                      <CommandItem
                        key={v}
                        value={v}
                        onSelect={currentValue => {
                          field.onChange(currentValue)
                          setValue(currentValue === value ? '' : currentValue)
                          setOpen(false)
                        }}>
                        <Checkbox
                          className={cn(
                            'mr-2 h-4 w-4',
                            value === v ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        {v}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  )
}

function SearchComponent({ setSearchStatisticsData }: SearchProps) {
  const { agencies, isLoading: isLoadingAgencies } = useListAgencies()
  const { cutOfDates, isLoading: isLoadingCutOfDates } = useListCutOfDates()
  const comparation = ['Año', 'Mes']

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = (data: FormType) => {
    setSearchStatisticsData(data)
  }

  if (isLoadingAgencies || isLoadingCutOfDates) return <div>Cargando...</div>

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row gap-4 max-w-[700px]">
        <ComboboxComponent
          form={form}
          data={agencies || []}
          name="agencie"
          label="Agencia"
        />
        <ComboboxComponent
          form={form}
          data={cutOfDates || []}
          name="date"
          label="Fecha"
        />
        <ComboboxComponent
          form={form}
          data={comparation || []}
          name="comparation"
          label="comparacion"
        />

        <Button className="w-full" type="submit">
          <Search className="mr-2 h-4 w-4" />
          Buscar
        </Button>
      </form>
    </Form>
  )
}

export default SearchComponent
