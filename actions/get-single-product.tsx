import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getSingleProduct = async (id: string): Promise<Product> => {
  try {
    const res = await fetch(`${URL}/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch product. Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export default getSingleProduct;
