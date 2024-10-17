import { Outlet } from 'react-router-dom'

/**
 * Renders the root layout of the application.
 *
 * @return {JSX.Element} The root layout component.
 */

function RootLayout() {
  return (
    <>
      <Outlet />
    </>
  )
}

export default RootLayout
