"use client";

import { Product } from "@/types";
import Currency from "./ui/currency";
import Button from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { MouseEventHandler, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { error } from "console";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);

  const onAddToCart = () => {
    cart.addItemToCart(data);
  };

  // const handleQuantityChange = () => {
  //   const orderQuantity = quantity;
  //   setQuantity(orderQuantity);
  // };

  // const addQuantity = () => {
  //   const initialQuantity = quantity;
  //   if (initialQuantity >= data.quantity) {
  //     toast.error(
  //       initialQuantity <= 1
  //         ? `Only ${quantity} item left`
  //         : `Only ${quantity} items are available`
  //     );
  //     return initialQuantity;
  //   }

  //   setQuantity(initialQuantity + 1);
  // };

  // const subQuantity = () => {
  //   if (!quantity || quantity <= 1) {
  //     return toast.error("Invalid quantity");
  //   }
  //   setQuantity(quantity - 1);
  // };

  return (
    <div>
      <h1 className="text-3 font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-3">
          <h3 className="font-semibold text-black">Size :</h3>
          <div> {data?.size?.name} </div>
        </div>
        <div className="flex items-center gap-x-3">
          <h3 className="font-semibold text-black">Color :</h3>
          <div
            className="h-6 w-6 rounded-md border border-gray-600"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
        <div className="flex items-center gap-x-3 text-center">
          <h3 className="font-medium text-black"> Avail : {data.quantity} </h3>
        </div>
        {/* <div className="flex gap-x-1">
          <Button
            onClick={subQuantity}
            className=""
            disabled={quantity == 1 ? true : false}
          >
            {" "}
            -{" "}
          </Button>
          <input
            className="text-center border border-spacing-2 w-12"
            disabled
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <Button
            onClick={addQuantity}
            disabled={quantity == data.quantity ? true : false}
            className=""
          >
            {" "}
            +{" "}
          </Button>
        </div> */}
      </div>

      <div className="mt-10 flex items-center gap-x-3">
        <Button
          onClick={onAddToCart}
          className="flex items-center gap-x-1 bg-yellow-500 text-black"
        >
          Add to Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
