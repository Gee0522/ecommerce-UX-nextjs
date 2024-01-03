"use client";

import { Product, Review } from "@/types";
import Currency from "./ui/currency";
import Button from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { MouseEventHandler } from "react";
import ReviewForm from "./ui/review-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import getReview from "@/actions/get-review";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const review = getReview({});
  const { data: session } = useSession();

  const cart = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItemToCart(data);
  };

  console.log(JSON.stringify(review));
  const handleReviewSubmit = (newReview: Review) => {
    // Handle the newly submitted review
    toast("New Review:", newReview);
  };

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
          <h3 className="font-medium text-black"> Stock : {data.quantity} </h3>
        </div>
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
      <div>
        {/* <ReviewForm
          productId={data.id}
          userId={userId}
          onReviewSubmit={handleReviewSubmit}
        /> */}
      </div>
    </div>
  );
};

export default Info;
