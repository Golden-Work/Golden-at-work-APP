import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL as string,
  headers: {
    Authorization: localStorage.getItem("access")
      ? `Bearer ${localStorage.getItem("access")}`
      : "",
  },
})

// add interceptor to refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      try {
        originalRequest._retry = true
        const refresh = localStorage.getItem("refresh")
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}auth/refresh`,
          {
            refresh,
          }
        )
        if (response.status === 200) {
          localStorage.setItem("access", response.data.access)
          localStorage.setItem("refresh", response.data.refresh)
          api.defaults.headers.common.Authorization = `Bearer ${response.data.access}`
          return api(originalRequest)
        }
      } catch (e: any) {
        if (e?.response?.status === 401) {
          localStorage.removeItem("access")
          localStorage.removeItem("refresh")
          window.location.href = "/login"
        }
      }
    }
    return Promise.reject(error)
  }
)

export default api
