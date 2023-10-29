import EdicionDeDatos from "@/pages/EdicionDeDatos"
import Home from "@/pages/Home/Home"
import Login from "@/pages/Login/Login"
import Register from "@/pages/Register/Register"
import ResetPassword from "@/pages/ResetPassword/ResetPassword"
import { createBrowserRouter } from "react-router-dom"
import Authmiddleware from "./AuthMiddleware"
import AdminHome from "@/pages/AdminHome/AdminHome"

const authRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: Register,
  },
  {
    path: "/reset-password",
    component: ResetPassword,
  },
]

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/edit",
    component: EdicionDeDatos,
  },
]

const adminRoutes = [
  {
    path: "/admin",
    component: AdminHome,
  },
]

const router = createBrowserRouter([
  ...authRoutes.map((r) => {
    return {
      path: r.path,
      element: (
        <Authmiddleware requiresAuth={false}>{<r.component />}</Authmiddleware>
      ),
    }
  }),
  ...routes.map((r) => {
    return {
      path: r.path,
      element: (
        <Authmiddleware requiresAuth={true}>{<r.component />}</Authmiddleware>
      ),
    }
  }),
  ...adminRoutes.map((r) => {
    return {
      path: r.path,
      element: (
        <Authmiddleware requiresAuth={true} isAdminRoute={true}>
          {<r.component />}
        </Authmiddleware>
      ),
    }
  }),
])

export default router
