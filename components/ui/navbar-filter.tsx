"use client";

import Login from "@/app/login";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { Dialog } from "@headlessui/react";
import { MenuIcon, ShoppingCart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IconButton from "@/components/ui/icon-button";

const NavBarFilter = () => {
  const [isMounted, setIsMounteed] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  useEffect(() => {
    setIsMounteed(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) return null;
  console.log(cart.items);

  return (
    <>
      <button
        onClick={onOpen}
        className="flex flex-center gap-x-2 lg:hidden md:hidden"
      >
        <MenuIcon size={20} />
      </button>

      <Dialog
        open={open}
        as={"div"}
        className="fixed inset-0 z-50 overflow-hidden pr-3"
        onClose={onClose}
      >
        {/* background */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel
            className={
              "relative ml-auto h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"
            }
          >
            {/* Close button */}
            <div className="flex items-center justify-end px-5">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>
            {/* Render the Filters */}
            <div className="p-4 justify-between">
              <div className="p-4 pb-2">
                <Login />
              </div>
              <div className="p-4">
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
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default NavBarFilter;
