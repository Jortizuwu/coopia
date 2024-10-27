import { lazy, Suspense } from 'react'
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'
import usePersistedStore from '@/store'

const Layout = lazy(() => import('../layout'))
const Home = lazy(() => import('../../pages/home'))
const Charts = lazy(() => import('../../pages/charts'))
const HealthCheck = lazy(() => import('../../pages/utilities'))

import { LoginForm } from '@/core/pages/auth'

const PrivateRoute = () => {
  const { token } = usePersistedStore(state => state)
  return token ? <Outlet /> : <Navigate to="/auth/login" />
}

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
          <div className="h-screen w-full flex items-center justify-center">
            <span>Loading ...</span>
          </div>
        }>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/charts" element={<Charts />} />
            </Route>

            {/* Ruta de Health Check */}
          </Route>
          <Route path="/health" element={<HealthCheck />} />
          <Route path="/auth">
            <Route index path="login" element={<LoginForm />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
