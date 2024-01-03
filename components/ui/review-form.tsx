// components/ReviewForm.tsx

import { useState } from "react";
import axios from "axios";
import { Review } from "@/types";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface ReviewFormProps {
  productId: string;
  userId: string;
  onReviewSubmit: (newReview: Review) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  userId,
  onReviewSubmit,
}) => {
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating <= 0 || rating >= 5) {
      toast("Invalid rating");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REVIEW_URL}/`, {
        productId: productId,
        userId: userId,
        rating,
        comment,
      });

      const newReview = response.data.review;

      // Notify parent component or update UI as needed
      onReviewSubmit(newReview);
    } catch (error) {
      console.error("Error submitting review:", error);
      // Handle error or show a notification to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input
          className="border"
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </label>
      <br />
      <label className="border">
        Comment:
        <textarea
          className="border"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      <br />
      <button type="submit" className="border">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
