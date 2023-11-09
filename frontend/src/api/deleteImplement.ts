import api from ".";

const deleteImplement = async (itemId: number): Promise<any> => {
  try {
    const response = await api.delete(`/implement/${itemId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default deleteImplement;
