"use client";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

import { MinusIcon, PlusIcon, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { MouseEventHandler, useEffect, useState } from "react";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const router = useRouter();
  const cart = useCart();
  const productInCart = cart.items.find((item) => item.id === data.id);
  // const [quantity, setQuantity] = useState(data.quantity);
  const [quantity, setQuantity] = useState(productInCart?.quantity || 1);

  // Update the quantity state when the actual product quantity changes
  useEffect(() => {
    setQuantity(data?.quantity || 1);
  }, [productInCart]);

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const addQuantity: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addQuantity(data);
  };

  const subQuantity: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.decrementItem(data.id);
  };

  const perItemTotal = Number(data.quantity) * Number(data.price);

  console.log(`INCART-${productInCart?.quantity} | PRODUCT-${data.quantity}`);

  return (
    <>
      <li className="flex py-6 border-b">
        <div
          onClick={() => router.push(`/product/${data.id}`)}
          className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48 cursor-pointer"
        >
          <Image
            fill
            src={data.images[0].url}
            alt=""
            className="object-cover object-center"
          />
        </div>
        <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
          <div className="absolute z-10 right-0 top-0">
            <IconButton onClick={onRemove} icon={<X size={15} />} />
          </div>
          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
            <div className="flex justify-between">
              <p className="text-lg font-bold text-black">{data.name}</p>
            </div>
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">{data.color.name} </p>
              <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">
                {data.size.name}
              </p>
            </div>
            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
              <Currency value={data.price} />
            </div>
          </div>
          <div className="relative flex items-center h-auto">
            <p className="relative p-3 pl-0 font-semibold font-sans text-left">
              Qty :
            </p>
            <Button
              onClick={subQuantity}
              id="quantity"
              name="quantity"
              className="p-1 border bg-red-600 rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:border-green-500"
              disabled={data.quantity <= 1 ? true : false}
            >
              {" "}
              <MinusIcon className="p-0.5" />
            </Button>
            <input
              className="text-center flex rounded-md border border-black border-spacing- w-9 ml-0.5 mr-0.5 h-9 mx-2"
              disabled
              id="quantity"
              name="quantity"
              value={productInCart ? productInCart.quantity : 0}
              onChange={() => setQuantity(quantity)}
            />
            <Button
              onClick={addQuantity}
              id={"quantity"}
              name="quantity"
              className="p-1 border bg-blue-700 rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:border-green-500"
              // disabled={}
            >
              <PlusIcon className="p-0.5" />
            </Button>
          </div>
          <div className="absolute z-10 right-4 bottom-1">
            <p className="text-black font-medium pl-3">
              {" "}
              <Currency value={perItemTotal} />{" "}
            </p>
          </div>
        </div>
      </li>
    </>
  );
};

export default CartItem;
