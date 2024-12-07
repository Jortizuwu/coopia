import NavbarComponent from './components/navbar'
import { Outlet } from 'react-router-dom'
// import SidebarComponent from './components/sidebar'

/**
 * Renders the root layout of the application.
 *
 * @return {JSX.Element} The root layout component.
 */

function RootLayout() {
  return (
    <div className="flex w-full flex-col">
      <section className="mb-16">
        <NavbarComponent />
      </section>
      <section className="flex w-full">
        <div>
          {/* <SidebarComponent /> */}
        </div>
        <main className="flex flex-col w-full">
          <Outlet />
        </main>
      </section>
    </div>
  )
}

export default RootLayout
