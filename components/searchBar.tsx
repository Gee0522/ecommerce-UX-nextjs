"use client";

import { Product } from "@/types";
import { SearchIcon, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import qs from "query-string";
import NoResults from "./ui/no-results";

interface ProductSearchProps {
  data: Product[];
  valueKey: string;
}

const SearchBar: React.FC<ProductSearchProps> = ({ data, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedValue = searchParams.get(valueKey);
  const [searchTerm, setSearchTerm] = useState(selectedValue || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: term,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
  };

  const filteredData = data
    .filter((product) => {
      const productNameMatch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const colorNameMatch = product.color.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryNameMatch = product.category.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return productNameMatch || colorNameMatch || categoryNameMatch;
    })
    .slice(0, 5);

  console.log(filteredData);

  const clearData = () => {
    setSearchTerm(searchTerm.slice(0, 0));
  };

  return (
    <div className="relative flex-col rounded-md p-2 pt-4 text-base m-auto gap-x-4">
      <div className="block relative">
        <div className="pointer-events-auto absolute items-center">
          <SearchIcon className="h-8 w-8 text-gray-500 pt-2 text-center justify-center" />
        </div>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search products.."
          onChange={handleInputChange}
          className="flex w-full md:w-auto rounded-md border border-black py-1.5 pl-10 text-gray-600 font-sans mb-1 "
        />
        {searchTerm && (
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={clearData}
          >
            <XIcon className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* { displaying filtered products } */}
      <div className="absolute z-10 w-full mt-2 bg-white ring-black ring-opacity-5 rounded-md">
        {searchTerm && filteredData.length > 0 ? (
          <>
            {filteredData.map((product) => (
              <div className="pt-2" key={product.id}>
                <a
                  className="pl-1 bg-white flex items-center hover:opacity-50 transition"
                  href={`/product/${product?.id}`}
                >
                  <div className="p-2">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-8 h-8 border p-1 rounded-md"
                  />
                  <div className="p-0 pl-2 font-medium text-md">
                    {product.name}
                  </div>
                </a>
              </div>
            ))}
          </>
        ) : (
          searchTerm &&
          filteredData.length == 0 && (
            <>
              <div className="p-3 border-spacing-0">
                <NoResults />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBar;
