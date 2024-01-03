"use client";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";

import Currency from "@/components/ui/currency";
import SignUpForm from "@/app/sign-up";

const CartPage = () => {
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const items = useCart((state) => state.items);

  const totalPrice = () => {
    return items.reduce((total, item) => {
      return total + Number(item.price) * item.quantity;
    }, 0);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  // add total item every product

  return (
    <div className="bg-white">
      <Container>
        <div className="px-3 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <>
                  <p className="text-neutral-600 text-lg text-center">
                    No added Item.
                  </p>
                </>
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
              <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-2 top-2">
                  {cart.items.length === 0 ? (
                    <div>{""}</div>
                  ) : (
                    <div className="flex font-medium">
                      Total{" "}
                      {cart.items.length === 1
                        ? `(${cart.items.length} Item)`
                        : `(${cart.items.length} Items)`}{" "}
                      :
                      <div className="pl-2 pr-2">
                        <Currency value={totalPrice()} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
