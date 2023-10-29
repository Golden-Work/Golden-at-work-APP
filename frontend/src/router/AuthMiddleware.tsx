import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"
import { jwtDecode } from "jwt-decode"

interface AuthmiddlewareProps {
  requiresAuth: boolean
  children: React.ReactNode
  isAdminRoute?: boolean
}

const Authmiddleware = ({ children, requiresAuth }: AuthmiddlewareProps) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (requiresAuth && !localStorage.getItem("access")) {
      return navigate("/login")
    }

    // special case for login page
    if (pathname === "/login" && localStorage.getItem("access")) {
      return navigate("/")
    }

    if (!requiresAuth) return
    const user = jwtDecode(localStorage.getItem("access")!)
    console.log(user)
  }, [requiresAuth])

  return children
}
export default Authmiddleware
