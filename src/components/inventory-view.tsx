"use client";
import InventoryHeader from "@/components/inventory-header";
import InventoryTable from "@/components/inventory-table";
import { useDebounce } from "@/hooks/use-debounce";
import { useInventory } from "@/hooks/use-inventory";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function InventoryView() {
  const searchParams = useSearchParams();
  const initialLocation = searchParams.get("locationId");

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{
    labels: string[];
    locations: string[];
    parentIds: string[];
  }>({
    labels: [],
    locations: initialLocation ? [initialLocation] : [],
    parentIds: [],
  });

  // Handle URL param changes
  useEffect(() => {
    if (initialLocation && !filters.locations.includes(initialLocation)) {
      setFilters(prev => ({
        ...prev,
        locations: [initialLocation]
      }));
    }
  }, [initialLocation]);

  const debouncedSearch = useDebounce(search, 500);
  const pageSize = 10;

  const { data, isLoading, isError, error, refetch } = useInventory({
    page,
    pageSize,
    q: debouncedSearch,
    labels: filters.labels,
    locations: filters.locations,
    parentIds: filters.parentIds,
  });

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1); // Reset to first page on search
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <InventoryHeader
        onSearch={handleSearch}
        filters={filters}
        onFilterChange={setFilters}
      />
      {isError ? (
        <div className="flex flex-col flex-1 justify-center items-center bg-white shadow-sm m-6 p-8 border border-red-100 rounded-2xl">
          <div className="bg-red-50 mb-4 p-4 rounded-full">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="mb-2 font-bold text-slate-900 text-xl">
            Failed to load inventory
          </h3>
          <p className="mb-6 max-w-md text-slate-500 text-center">
            {error?.message || "An unexpected error occurred while fetching your items. Please check your connection and try again."}
          </p>
          <Button
            onClick={() => refetch()}
            leftIcon={<RefreshCcw size={18} />}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
        </div>
      ) : (
        <InventoryTable
          items={data?.items || []}
          isLoading={isLoading}
          total={data?.total || 0}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
