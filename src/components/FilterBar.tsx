import { Filter } from "@/components";
import { Popular } from "@/components";

export const FilterBar = () => {
  return (
    <div className="w-full mx-auto px-5 py-5 justify-between flex">
      <Popular />
      <Filter />
    </div>
  );
};
