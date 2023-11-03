import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import ThemeContextProvider from "./contexts/MUIContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"
import router from "./router"

const queryClient = new QueryClient()

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
