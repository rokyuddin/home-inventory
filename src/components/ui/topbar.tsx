"use client";
import { Search, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="bg-white px-8 py-5 border-b border-[#F1F5F9] flex items-center justify-between gap-8 shrink-0">
      <div className="flex items-center gap-12 flex-1">
        <h1 className="text-2xl font-bold text-[#0F172A]">Inventory</h1>

        <div className="relative flex-1 max-w-xl">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#94A3B8]" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-2.5 border border-[#E2E8F0] rounded-xl bg-white placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-[15px] transition-all duration-200"
            placeholder="Search items..."
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" leftIcon={<Download className="h-5 w-5" />}>
          Export
        </Button>
        <Button leftIcon={<Plus className="h-5 w-5" />}>Add Item</Button>
      </div>
    </header>
  );
}
