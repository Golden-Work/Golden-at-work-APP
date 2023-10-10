import EdicionDeDatos from "@/pages/EdicionDeDatos"
import Home from "@/pages/Home/Home"
import Login from "@/pages/Login/Login"
import Register from "@/pages/Register/Register"
import ResetPassword from "@/pages/ResetPassword/ResetPassword"
import { createBrowserRouter } from "react-router-dom"
import Authmiddleware from "./AuthMiddleware"

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
])

export default router
