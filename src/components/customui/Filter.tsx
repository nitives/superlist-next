"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LucideSettings2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import siteData from "@/app/content/siteData.json";

export const Filter = ({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) => {
  const categories = Array.from(
    new Set(siteData.flatMap((site) => site.categories))
  );

  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  return (
    <div className="">
      <Popover>
        <PopoverTrigger className="flex h-10 py-2 px-4 text-sm max-sm:h-8 max-sm:py-1 max-sm:px-2 max-sm:text-xs items-center justify-between rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-fit">
          <LucideSettings2 size={16} className="mr-1" />
          Filter
        </PopoverTrigger>
        <PopoverContent align="start" className="pt-3 px-0">
          <p className="text-sm font-medium px-4">Filter</p>
          <hr className="border-t my-2 w-full" />
          <div className="flex flex-col gap-2 px-4 py-2">
            <div className="text-sm font-medium w-full flex justify-between">
              <p>Categories</p>
            </div>
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCheckboxChange(category)}
                />
                <p className="text-sm font-medium">{category}</p>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
