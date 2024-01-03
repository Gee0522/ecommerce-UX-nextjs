import { Product, Review } from "@/types";
import qs from "query-string";

const URL = `${process.env.REVIEW_URL}/`;

interface Query {
  productId?: string;
  userId?: string;
  comment?: string;
  rating?: number;
}

const getReview = async (query: Query): Promise<Review> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      productId: query.productId,
      userId: query.userId,
      comment: query.comment,
      rating: query.rating,
    },
  });
  const res = await fetch(url);

  return res.json();
};

export default getReview;

// import { Category } from "@/types";

// const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

// const getSingleCategory = async (id: string): Promise<Category> => {
//   const res = await fetch(`${URL}/${id}`);

//   return res.json();
// };

// export default getSingleCategory;
