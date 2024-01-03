"use client";

import Login from "@/app/login";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { Dialog } from "@headlessui/react";
import { MenuIcon, SearchIcon, ShoppingCart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IconButton from "@/components/ui/icon-button";
import { Product } from "@/types";
import SearchBar from "./searchBar";

interface ProductSearchProps {
  data: Product[];
  valueKey: string;
}

const SearchFilter: React.FC<ProductSearchProps> = ({ data, valueKey }) => {
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
      <button onClick={onOpen} className="flex flex-center gap-x-2 md:hidden">
        <SearchIcon />
      </button>

      <Dialog
        open={open}
        as={"div"}
        className="fixed inset-10 z-50 overflow-hidden pr-3"
        onClose={onClose}
      >
        {/* background */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel
            className={
              "relative flex-1 w-full max-w-lg flex flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"
            }
          >
            {/* Close button */}
            <div className="flex items-center justify-end px-5">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>
            {/* Render the Filters */}
            <div className="p-2">
              <SearchBar data={data} valueKey="id" />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default SearchFilter;
