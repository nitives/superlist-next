import { Filter } from "@/components";
import { Popular } from "@/components";

export const FilterBar = ({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) => {
  return (
    <div className="w-full mx-auto px-5 max-sm:px-[.95rem] py-0 justify-between flex">
      <Filter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      {/* <Popular /> */}
    </div>
  );
};
