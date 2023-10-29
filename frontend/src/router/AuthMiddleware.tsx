import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"
import { JwtPayload, jwtDecode } from "jwt-decode"

interface AuthmiddlewareProps {
  requiresAuth: boolean
  children: React.ReactNode
  isAdminRoute?: boolean
}

const Authmiddleware = ({
  children,
  requiresAuth,
  isAdminRoute,
}: AuthmiddlewareProps) => {
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
    const user: JwtPayload & { is_staff: boolean } = jwtDecode(
      localStorage.getItem("access")!
    )
    if (isAdminRoute && !user.is_staff) {
      return navigate("/")
    }

    if (!isAdminRoute && requiresAuth && user.is_staff) {
      return navigate("/admin")
    }
  }, [requiresAuth])

  return children
}
export default Authmiddleware
