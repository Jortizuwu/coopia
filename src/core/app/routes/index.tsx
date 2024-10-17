import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Layout = lazy(() => import('../layout'))
const Home = lazy(() => import('../../pages/home'))
const Charts = lazy(() => import('../../pages/charts'))

/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The main application component.
 */
const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className='h-screen w-full flex items-center justify-center'>
            <span>Loading ...</span>
          </div>
        }>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/charts" element={<Charts />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
