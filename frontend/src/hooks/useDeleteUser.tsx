
import axios from "axios"
import { useNavigate } from "react-router"

function useDeleteUser(){
    const navigate = useNavigate()
    const deleteUser = async() => {
        const access = localStorage.getItem("access");
        let reqInstance = axios.create({
            headers: {
              Authorization : `Bearer ${access}`
              }
          })
        const response = await reqInstance.delete(
            `${import.meta.env.VITE_APP_BASE_URL}auth/delete`
        )
        if (response.status === 200) {
        navigate("/login");
        localStorage.clear();
        }

    }
    return {
        deleteUser
    }

}

export default useDeleteUser