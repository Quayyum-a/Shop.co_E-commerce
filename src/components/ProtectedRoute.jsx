import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth)
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to home page with a message about needing to log in
    // You could also redirect to a login page or show a modal
    return <Navigate to="/" state={{ from: location, requiresAuth: true }} replace />
  }

  return children
}

export default ProtectedRoute
