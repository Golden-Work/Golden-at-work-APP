import api from "."
import { Implement } from "@/interfaces/implement.interface"


const editImplement = async (implementData: Implement): Promise<any> => {
  try {
    const response = await api.put("/implement", implementData); 
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export default editImplement;
