import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import ThemeContextProvider from "./contexts/MUIContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

const queryClient = new QueryClient()

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </ThemeContextProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  )
}

export default App
