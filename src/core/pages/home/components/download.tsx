import { Button } from '@/shared/components/ui/button'

function DownloadComponent() {
  return (
    <article className="flex items-center justify-between space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="flex items-center space-x-2">
        <Button>Download</Button>
      </div>
    </article>
  )
}

export default DownloadComponent
