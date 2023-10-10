import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"

interface AuthmiddlewareProps {
  requiresAuth: boolean
  children: React.ReactNode
}

const Authmiddleware = ({ children, requiresAuth }: AuthmiddlewareProps) => {
  const navigate = useNavigate()

  const { pathname } = useLocation()

  useEffect(() => {
    if (requiresAuth && !sessionStorage.getItem("access")) {
      return navigate("/login")
    }

    // special case for login page
    if (pathname === "/login" && sessionStorage.getItem("access")) {
      navigate("/")
    }
  }, [requiresAuth])

  return children
}
export default Authmiddleware
