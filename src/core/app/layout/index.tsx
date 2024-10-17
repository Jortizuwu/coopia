import NavbarComponent from './components/navbar'
import Main from './components/main'

/**
 * Renders the root layout of the application.
 *
 * @return {JSX.Element} The root layout component.
 */

function RootLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavbarComponent />
      <Main navCollapsedSize={4} />
    </div>
  )
}

export default RootLayout
