import showErrors from "@/utils/showErrors"
import axios from 'axios'
import { useNavigate } from "react-router"
import { useState } from "react"
import { toast } from "react-toastify"

const useAdd =() =>{    
    const navigate=useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const addImplemento=async(implemento)=>{
        setIsLoading(true)
        try{
            const response=await axios.post(
                `${process.env.VITE_APP_BASE_URL}/implements`,
                implemento
            );
            if(response.status==201){
                toast.success('Implemento añadido correctamente')
                navigate("/admin")
            }else{
                toast.error('Error al añadir implemento. Por favor, intentelo de nuevo más tarde')
            }
        }catch(error:any){
            showErrors(error)
        }
        setIsLoading(false)
    }
    return{
        addImplemento,
        isLoading
    }
}

export default useAdd