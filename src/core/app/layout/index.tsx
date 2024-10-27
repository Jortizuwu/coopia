import NavbarComponent from './components/navbar'
import Main from './components/main'

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
      <Main navCollapsedSize={4} />
    </div>
  )
}

export default RootLayout
