import NavbarComponent from './components/navbar'
import Main from './components/main'

/**
 * Renders the root layout of the application.
 *
 * @return {JSX.Element} The root layout component.
 */

function RootLayout() {
  return (
    <div className="flex h-screen w-full flex-col">
      <section className="mb-16">
        <NavbarComponent />
      </section>
      <section className='h-screen overflow-hidden'>
        <Main navCollapsedSize={4} />
      </section>
    </div>
  )
}

export default RootLayout
