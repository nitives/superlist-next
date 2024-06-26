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
    <div className="w-full mx-auto px-5 py-5 justify-between flex">
      <Filter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      {/* <Popular /> */}
    </div>
  );
};
