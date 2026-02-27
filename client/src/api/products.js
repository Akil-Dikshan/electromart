const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products: ', error);
        throw error;
    }
};
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};