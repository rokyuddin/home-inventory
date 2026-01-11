"use client";

import { Download, Plus, Search, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import InventoryFilter from "./inventory-filter";
import { Separator } from "../ui/separator";
import { inventoryApi } from "@/lib/inventory-api";

interface InventoryHeaderProps {
  onSearch?: (query: string) => void;
  filters?: {
    labels: string[];
    locations: string[];
    parentIds: string[];
  };
  onFilterChange?: (filters: {
    labels: string[];
    locations: string[];
    parentIds: string[];
  }) => void;
}

import { useState } from "react";
import CreateItemModal from "./create-item-modal";

export default function InventoryHeader({
  onSearch,
  filters,
  onFilterChange,
}: InventoryHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const blob = await inventoryApi.exportInventory();

      // Create a link and click it to download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "inventory-export.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("Export failed", error);
      alert("Failed to export inventory");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <header className="space-y-4 bg-white py-5 border-[#F1F5F9] border-b shrink-0">
        <div className="flex justify-between items-center gap-8 px-8 shrink-0">
          <div className="flex flex-1 items-center gap-12">
            <h1 className="font-bold text-[#0F172A] text-2xl">Inventory</h1>

            <div className="relative flex-1 max-w-xl">
              <div className="left-4 absolute inset-y-0 flex items-center pointer-events-none">
                <Search className="size-5 text-[#94A3B8]" />
              </div>
              <input
                type="text"
                className="block bg-white py-2.5 pr-4 pl-11 border border-[#E2E8F0] focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary w-full text-[15px] transition-all duration-200 placeholder-[#94A3B8]"
                placeholder="Search items..."
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              leftIcon={
                isExporting ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <Download className="size-5" />
                )
              }
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? "Exporting..." : "Export"}
            </Button>
            <Button
              leftIcon={<Plus className="size-5" />}
              onClick={() => setIsModalOpen(true)}
            >
              Add Item
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <InventoryFilter filters={filters} onFilterChange={onFilterChange} />
      </header>

      <CreateItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
