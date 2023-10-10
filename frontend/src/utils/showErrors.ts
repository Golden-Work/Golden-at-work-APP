import { toast } from "react-toastify"

const showErrors = (error: any) => {
  if (error?.response?.data) {
    Object.keys(error.response.data).forEach((key) => {
      toast.error(`${key}: ${error.response.data[key]}`)
    })
  }
}

export default showErrors
