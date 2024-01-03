"use client";

import getUser from "@/actions/get-user";
import loginUser from "@/actions/post-user";
import Button from "@/components/ui/button";
import { UserCard } from "@/components/userCard";

import { useSession, signIn } from "next-auth/react";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handleSignIn = async () => {
  //   try {
  //     // Use loginUser to authenticate the user
  //     const user = await loginUser(email, password);

  //     if (user) {

  //       console.log("user details:", user.email);

  //       // Redirect user to the desired page
  //       window.location.href = "/";
  //     } else {
  //       // Handle login failure
  //       toast.error("Login failed");
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //   }
  // };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (session) {
    return (
      <>
        {/* If the user is signed in, display user information */}
        <UserCard user={session?.user} />
      </>
    );
  } else {
    return (
      <>
        <Button
          onClick={() => signIn()}
          type="button"
          className="btn btn-primary border p-2 rounded-md"
        >
          Login
        </Button>
      </>
    );
  }
};

export default Login;
