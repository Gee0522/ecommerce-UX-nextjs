import getBillboard from "@/actions/get-billboard";
import getCategories from "@/actions/get-categories";
import getProducts from "@/actions/get-products";
import getSingleProduct from "@/actions/get-single-product";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import SearchBar from "@/components/searchBar";
import Container from "@/components/ui/container";
import { Product } from "@/types";
import React from "react";

interface ProductPageProps {
  data: Product;
}
export const revalidate = 0;
const HomePage: React.FC<ProductPageProps> = async ({ data }) => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("c61891ba-d64c-4e8e-a674-80ed8d5f29fb");

  return (
    <>
      <Container>
        <div className="space-y-10 pb-10">
          <div className="flex items-center relative justify-center pb-0">
            <SearchBar data={products} valueKey={"id"} />
          </div>
          <Billboard data={billboard} />
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <ProductList title="Featured Products" items={products} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default HomePage;
