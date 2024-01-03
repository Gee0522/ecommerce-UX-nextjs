"use client";

import SignUpForm from "@/app/sign-up";
import Login from "@/app/login";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const NavbarActions = () => {
  const { data: session } = useSession();
  const [isMounted, setIsMounteed] = useState(false);

  useEffect(() => {
    setIsMounteed(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) return null;
  console.log(cart.items);

  return (
    <div className="ml-auto flex items-center gap-x-4">
      {!session?.user ? (
        <>
          <Button
            className="p-2 rounded-md"
            onClick={() => router.push("/user")}
          >
            {" "}
            Sign-up{" "}
          </Button>
        </>
      ) : (
        ""
      )}
      <Login />
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-md bg-yellow-500 px-3 py-2"
      >
        <ShoppingCart size={20} color="black" />
        <span className="ml-2 text-md font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
};

export default NavbarActions;
