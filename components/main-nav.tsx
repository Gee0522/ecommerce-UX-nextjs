"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-bold font-mono">
              Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <h2 className="pb-0 p-2 font-medium text-center">
                Select Category :
              </h2>
              <ul className="p-2 md:w-[300px] lg:w-[200px] left-1.5">
                <NavigationMenuLink asChild>
                  <nav className="items-center">
                    {routes.map((route) => (
                      <div className="flex flex-row" role="btn">
                        <Link
                          onClick={handleOptionClick}
                          key={route.href}
                          href={route.href}
                          className={cn(
                            "text-md font-semibold transition-colors p-1 hover:text-black grid",
                            route.active ? "text-black" : "text-neutral-500"
                          )}
                        >
                          {route.label}
                        </Link>
                      </div>
                    ))}
                  </nav>
                </NavigationMenuLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default MainNav;
