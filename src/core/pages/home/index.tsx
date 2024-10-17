import { useListCooperatives } from '@/shared/hooks/react-query/cooperatives'
import DownloadComponent from './components/download'
import MainHomeComponent from './components/main'
import SearchComponent from './components/search'
import { useState } from 'react'

export default function HomePage() {
  const [searchCooperativeDate, setSearchCooperativeDate] = useState<{
    date: string
    type: 'CONS'
    active: boolean
  }>({
    date: '2024-01-31',
    type: 'CONS',
    active: true,
  })

  const { cooperatives, isLoading } = useListCooperatives(
    searchCooperativeDate.date,
    searchCooperativeDate.type,
    searchCooperativeDate.active,
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        Loading...
      </div>
    )
  }

  if (!cooperatives) {
    return <div>No data</div>
  }

  return (
    <section className="flex min-h-screen w-full flex-col">
      <section className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <DownloadComponent />
        <SearchComponent setSearchCooperativeDate={setSearchCooperativeDate} />
        <MainHomeComponent cooperatives={cooperatives} />
      </section>
    </section>
  )
}
