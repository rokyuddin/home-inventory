import { ArrowDownWideNarrow, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InventoryFilter() {
  return (
    <div className=" px-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">

      <div className="flex items-center gap-2">
        <span className="text-sm leading-5 font-medium text-[#334155]">Filters:</span>

        <div className="px-3 py-1.5 bg-[#EFF6FF] rounded-lg text-[#3B82F6] flex items-center gap-2">
          <span className="text-sm leading-5 font-medium">All Locations</span>
        <X size={16}/>
        </div>
        <div className="px-3 py-1.5 bg-[#EFF6FF] rounded-lg text-[#3B82F6] flex items-center gap-2">
          <span className="text-sm leading-5 font-medium">In Stock</span>
        <X size={16}/>
        </div>
      </div>
      <Button variant="outline" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
        Add Filter
      </Button>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm leading-5 font-medium text-[#334155]">248 items</span>
        <Button variant="outline" size="sm" leftIcon={<ArrowDownWideNarrow className="h-4 w-4" />}>
          Sort: Updated
        </Button>
      </div>
    </div>
  )
}
