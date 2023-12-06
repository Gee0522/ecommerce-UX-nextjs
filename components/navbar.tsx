import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/navbar-actions";
import { StoreIcon } from "lucide-react";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <div className="border border-spacing-1 p-1 bg-gray-300 rounded-lg font-serif ">
            <Link href={"/"} className="ml-4 flex lg:ml-0 gap-x-2">
              <StoreIcon />
              <p className="font-bold text-blue-900 text-xl ">E-SHOP</p>
            </Link>
          </div>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
