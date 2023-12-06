"use client";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Summary = () => {
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment compeleted");
      removeAll();
    }
    const cancledParam = searchParams.get("canceled");
    if (cancledParam && cancledParam !== "user-cation") {
      toast.error("order Cancelled.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = () => {
    return (
      items.reduce((total, item) => {
        return total + Number(item.price) * item.quantity;
      }, 0) || null
    );
  };

  const onCheckout = async () => {
    setLoading(true);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      { productIds: items.map((item) => item) }
    );

    setLoading(false);

    window.location = response.data.url;
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCart();

  if (!isMounted) return null;

  return (
    <div className="mt-16 rounded-lg bg-gray-200 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-black-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-blue-500 pt-4">
          <div className="text-base font-medium text-gray-900">Subtotal :</div>
          <Currency value={totalPrice.toString()} />
        </div>
      </div>
      <Button
        disabled={items.length === 0}
        onClick={onCheckout}
        className="w-full mt-6 bg-yellow-500 text-black"
      >
        Checkout {""}
        {cart.items.length === 0 || 1
          ? `(${cart.items.length} Item)`
          : `(${cart.items.length} Items)`}
      </Button>
    </div>
  );
};

export default Summary;
