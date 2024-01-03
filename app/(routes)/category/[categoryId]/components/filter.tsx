"use client";

import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from "react";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id,
    };
    if (current[valueKey] == id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
  };

  return (
    <>
      <div className="mb-8">
        <Select onValueChange={onClick}>
          <div className="flex flex-wrap gap-2 font-semibold">{name} :</div>
          <SelectTrigger className="w-[125px]">
            <SelectValue placeholder={"Select"} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {data.map((filter) => (
              <SelectItem
                className={cn(
                  "text-black-600 hover:opacity-75",
                  selectedValue === filter.id
                )}
                value={filter.id}
                id={filter.id}
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Filter;
