import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Layout = lazy(() => import('../layout'))
const Home = lazy(() => import('../../pages/home'))

/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The main application component.
 */
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<span>Loading ...</span>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            {/* <Route path="/test" element={<Test />} /> */}
            {/* <Route path="/test/create" element={<CreateTest />} /> */}
          </Route>
          {/* <Route path='*' element={<PageNotFound />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
