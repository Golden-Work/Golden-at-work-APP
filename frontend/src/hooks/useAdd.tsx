import showErrors from "@/utils/showErrors"
import api from "@/api"
import { useNavigate } from "react-router"
import { useState } from "react"
import { toast } from "react-toastify"
import {Implement} from "@/interfaces/implement.interface"

const useAdd =() =>{    
    const navigate=useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const addImplemento=async(implemento: Implement)=>{
        setIsLoading(true)
        const formData= new FormData()
        formData.append('name',implemento.name)
        formData.append('description',implemento.description)
        formData.append('created_at',implemento.created_at)
        try{
            const response=await api.post(
                `implements`,
                implemento,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            if(response.status===201){
                console.log("Success")
                toast.success('Implemento añadido correctamente')
                navigate("/admin")
            }else{
                console.log("Error in add")
                toast.error('Error al añadir implemento. Por favor, intentelo de nuevo más tarde')
            }
        }catch(error:any){
            console.log("Catch error",error)
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