import { User } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user`;

const getUser = async (id: string): Promise<User> => {
  try {
    // Fetch user data from the API based on the email
    const res = await fetch(`${URL}/${id}`);

    if (!res.ok) {
      // Handle non-2xx status codes (e.g., 404 Not Found)
      console.error(`Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export default getUser;
