import api from ".";
import { toast } from "react-toastify";

const deleteImplement = async (id: number) => {
  try {
    const response = await api.delete(`/implements/${id}`);
    if (response.status === 200) {
      toast.success('Implemento eliminado exitosamente');
    }
  } catch (error) {
    toast.error('Error al eliminar el implemento');
    console.error('Error al eliminar el implemento', error);
  }
};

export default deleteImplement;
