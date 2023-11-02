import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import ThemeContextProvider from "./contexts/MUIContext"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./api"

import { RouterProvider } from "react-router-dom"
import router from "./router"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </ThemeContextProvider>
    </QueryClientProvider>
  )
}

export default App
