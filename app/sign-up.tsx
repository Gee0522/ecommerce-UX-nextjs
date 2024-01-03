"use client";

import Button from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignUpForm = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  console.log("SIGN_UP_URL:", `${process.env.NEXT_PUBLIC_API_URL}/user`);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // Handle success
        const responseData = await response.json();
        console.log("User created:", responseData);

        toast.success(`User ${user.name} created.`);
        setUser({
          name: "",
          email: "",
          password: "",
          password2: "",
        });
        router.push("/");
      } else {
        // Handle other status codes (e.g., 404, 500)
        throw new Error(`Request failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="p-10 pt-0 rounded-lg shadow-lg flex flex-col font-medium">
          <form onSubmit={handleSubmit}>
            <h1 className="text-xl font-semibold mb-4 mt-4">Sign Up</h1>
            <label className="mb-2">Name:</label>
            <div className="mb-4">
              <input
                className="p-2 border-gray-300 border-[1px] rounded-lg w-[300px] focus:outline-none focus:border-gray-600 text-black"
                type="text"
                placeholder="full name"
                name="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
            </div>
            <label className="mb-2">Email:</label>
            <div className="mb-4">
              <input
                className="p-2 border-gray-300 border-[1px] rounded-lg w-[300px] focus:outline-none focus:border-gray-600 text-black"
                type="email"
                placeholder="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <label className="mb-2">Password:</label>
            <div className="mb-4">
              <input
                className="p-2 border-gray-300 border-[1px] rounded-lg w-[300px] focus:outline-none focus:border-gray-600 text-black"
                type="password"
                name="password"
                placeholder="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>
            <label className="mb-2">Re-enter password</label>
            <div className="mb-4">
              <input
                className="p-2 border-gray-300 border-[1px] rounded-lg w-[300px] focus:outline-none focus:border-gray-600 text-black"
                type="password"
                name="password2"
                placeholder="password"
                value={user.password2}
                onChange={(e) =>
                  setUser({ ...user, password2: e.target.value })
                }
                required
              />
            </div>
            <br />
            <Button
              type="submit"
              className="p-2 w-72 border rounded-md hover:bg-blue-900 bg-blue-600 text-white border-gray-300  focus:outline-none focus:border-gray-600"
              disabled={user.password !== user.password2}
            >
              Create account
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
