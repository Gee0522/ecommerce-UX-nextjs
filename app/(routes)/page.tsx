import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import { Product } from "@/types";

import React from "react";
import SignUpForm from "../sign-up";

interface ProductPageProps {
  data: Product;
}
export const revalidate = 0;
const HomePage: React.FC<ProductPageProps> = async ({ data }) => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("0cb1cf6e-c9a4-4b36-b430-6d576e327e68");

  return (
    <>
      <Container>
        <div className="space-y-10 pb-10">
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
