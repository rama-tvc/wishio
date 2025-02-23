import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useFilter } from "@/hooks/useFilter";
import { WishlistItem } from "@/app/dashboard/page";
import { useChange } from "@/hooks/useIsChange";
import { cn } from "@/lib/utils";

interface FiltersProps {
  data: WishlistItem[];
  onSort: (sortedData: WishlistItem[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ data, onSort }) => {
  const [sortOptions, setSortOptions] = useState({
    byDate: false,
    byName: false,
  });
  const { isChangeFetch } = useChange();

  const handleSortChange = (option: "byDate" | "byName") => {
    const updateOptions = { ...sortOptions, [option]: !sortOptions[option] };

    if (option === "byDate" && updateOptions.byDate) {
      updateOptions.byName = false;
    }
    if (option === "byName" && updateOptions.byName) {
      updateOptions.byDate = false;
    }

    setSortOptions(updateOptions);

    const sortedData = [...data];
    if (updateOptions.byDate) {
      sortedData.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (updateOptions.byName) {
      sortedData.sort((a, b) => a.title.localeCompare(b.title));
    }

    onSort(sortedData);
  };
  useEffect(() => {
    setSortOptions({ byDate: false, byName: false });
  }, [isChangeFetch]);

  const { isOpen } = useFilter();

  return (
    <div
      className={cn(
        "w-64 border-r bg-white p-6 transition-transform duration-300 ease-in-out",
        isOpen ? "-translate-x-180" : "-translate-x-full"
      )}
    >
      <div className="font-semibold mb-4">Фильтры</div>
      <div className="space-y-4">
        <label className="flex items-center space-x-2">
          <Checkbox
            checked={sortOptions.byDate}
            onCheckedChange={() => handleSortChange("byDate")}
          />
          <span className="text-sm">По дате события</span>
        </label>
        <label className="flex items-center space-x-2">
          <Checkbox
            checked={sortOptions.byName}
            onCheckedChange={() => handleSortChange("byName")}
          />
          <span className="text-sm">По названию</span>
        </label>
      </div>
    </div>
  );
};

export default Filters;
