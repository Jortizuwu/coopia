import DownloadComponent from './components/download'
import TabsComponents from './components/tabs'
import MainHomeComponent from './components/main'

export const description =
  'An application shell with a header and main content area. The header has a navbar, a search input and and a user nav dropdown. The user nav is toggled by a button with an avatar image. The main content area is divided into two rows. The first row has a grid of cards with statistics. The second row has a grid of cards with a table of recent transactions and a list of recent sales.'

export default function HomePage() {
  return (
    <section className="flex min-h-screen w-full flex-col">
      <section className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <DownloadComponent />
        <TabsComponents />
        <MainHomeComponent />
      </section>
    </section>
  )
}
