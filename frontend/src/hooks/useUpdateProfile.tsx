import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const useUpdateProfile = () => {

  const [isLoading, setIsLoading] = useState(false);

  const updateProfile = async (data) => {
    setIsLoading(true);

    try {
      const url = `${import.meta.env.VITE_APP_BASE_URL}update_profile`;

      const response = await axios.put(url, data);

      if(response.status === 200) {
        toast.success("Perfil actualizado");
      } else {
        toast.error("Error al actualizar perfil");
      }

    } catch (error) {
      toast.error("Error al actualizar perfil");
    }
    
    setIsLoading(false);
  };

  return {
    updateProfile, 
    isLoading
  };
};

export default useUpdateProfile;