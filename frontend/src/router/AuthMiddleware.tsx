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
  }, [requiresAuth])

  useEffect(() => {
    if (pathname === "/login" && localStorage.getItem("access")) {
      const user: JwtPayload & { is_staff: boolean } = jwtDecode(
        localStorage.getItem("access")!
      )
      if (user.is_staff) {
        return navigate("/admin")
      } else {
        return navigate("/")
      }
    }
  }, [pathname])

  useEffect(() => {
    if (!requiresAuth) return
    const user: JwtPayload & { is_staff: boolean } = jwtDecode(
      localStorage.getItem("access")!
    )
    if (isAdminRoute && !user.is_staff) {
      return navigate("/")
    }
  }, [requiresAuth, isAdminRoute])

  useEffect(() => {
    if (!isAdminRoute && requiresAuth) {
      const user: JwtPayload & { is_staff: boolean } = jwtDecode(
        localStorage.getItem("access")!
      )
      if (user.is_staff) {
        return navigate("/admin")
      }
    }
  }, [requiresAuth, isAdminRoute])

  return children
}
export default Authmiddleware
