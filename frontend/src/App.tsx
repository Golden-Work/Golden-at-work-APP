import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import ThemeContextProvider from "./contexts/MUIContext"

import { RouterProvider } from "react-router-dom"
import router from "./router"

function App() {
  return (
    <ThemeContextProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </ThemeContextProvider>
  )
}

export default App
