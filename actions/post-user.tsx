import { User } from "@/types";
import { getToken } from "next-auth/jwt";
import { signIn } from "next-auth/react";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/login`;

const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    // Make a POST request to authenticate the user
    const res = await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      // Handle success
      const userData = await res.json();
      if (typeof userData.access !== "undefined") {
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/",
        });

        // Fetch user details and store in the session
        const userDetailsRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user`, // Update this endpoint
          {
            headers: {
              Authorization: `Bearer ${userData.access}`,
            },
          }
        );

        if (userDetailsRes.ok) {
          const userDetails = await userDetailsRes.json();
          return userDetails;
        }

        localStorage.setItem("token", userData.access);
      }

      return userData;
    } else {
      // Handle other status codes (e.g., 401 for unauthorized)
      console.error("Login failed:", res.status, res.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};

export default loginUser;
