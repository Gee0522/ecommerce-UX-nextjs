"use client";

import Container from "@/components/ui/container";
import { useEffect, useState } from "react";
import SignUpForm from "@/app/sign-up";
import { useRouter } from "next/router";

const SignUpPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-white text-center">
      <Container>
        <div className="px-3 py-16 pt-0 sm:px-6 lg:px-8">
          <SignUpForm />
        </div>
      </Container>
    </div>
  );
};

export default SignUpPage;
