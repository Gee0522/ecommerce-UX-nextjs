import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/navbar-actions";
import { StoreIcon } from "lucide-react";
import SearchBar from "./searchBar";
import getProducts from "@/actions/get-products";
import NavBarFilter from "./ui/navbar-filter";
import SearchFilter from "./serachFilter";

export const revalidate = 0;

const Navbar = async () => {
  const products = await getProducts({ isFeatured: true });
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="border border-spacing-1 p-1 pr-2 bg-gray-300 rounded-lg font-serif">
            <Link href={"/"} className="ml-4 flex lg:ml-0 gap-x-2">
              <StoreIcon />
              <p className="font-bold text-blue-900 text-xl ">STORE</p>
            </Link>
          </div>
          <MainNav data={categories} />
          <div className="hidden md:block lg:block">
            <SearchBar data={products} valueKey="id" />
          </div>
          <SearchFilter data={products} valueKey="id" />
          <NavBarFilter />
          <div className="hidden md:block">
            <NavbarActions />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
