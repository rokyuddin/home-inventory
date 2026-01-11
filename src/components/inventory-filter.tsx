"use client";

import { useLabels, useLocations } from "@/hooks/use-inventory";
import { ArrowDownWideNarrow, Check, ChevronDown, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface InventoryFilterProps {
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

export default function InventoryFilter({
  filters = { labels: [], locations: [], parentIds: [] },
  onFilterChange,
}: InventoryFilterProps) {
  const { data: labels } = useLabels();
  const { data: locations } = useLocations();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"labels" | "locations" | "parent">(
    "labels",
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFilter = (type: "labels" | "locations", id: string) => {
    const current = filters[type];
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];

    onFilterChange?.({
      ...filters,
      [type]: next,
    });
  };

  const removeFilter = (
    type: "labels" | "locations" | "parentIds",
    id: string,
  ) => {
    onFilterChange?.({
      ...filters,
      [type]: filters[type].filter((item) => item !== id),
    });
  };

  const getLabelName = (id: string) =>
    labels?.find((l) => l.id === id)?.name || id;
  const getLocationName = (id: string) =>
    locations?.find((l) => l.id === id)?.name || id;

  return (
    <div className="flex justify-between items-center gap-4 px-8">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[#334155] text-sm leading-5">
            Filters:
          </span>

          {filters.labels.length === 0 && filters.locations.length === 0 && (
            <span className="text-gray-400 text-sm italic">None</span>
          )}

          {filters.locations.map((id) => (
            <div
              key={id}
              className="flex items-center gap-2 bg-[#EFF6FF] hover:bg-blue-100 px-3 py-1.5 rounded-lg text-[#3B82F6] transition-colors cursor-pointer"
              onClick={() => removeFilter("locations", id)}
            >
              <span className="font-medium text-sm leading-5">
                Loc: {getLocationName(id)}
              </span>
              <X size={16} />
            </div>
          ))}

          {filters.labels.map((id) => (
            <div
              key={id}
              className="flex items-center gap-2 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg text-purple-600 transition-colors cursor-pointer"
              onClick={() => removeFilter("labels", id)}
            >
              <span className="font-medium text-sm leading-5">
                Label: {getLabelName(id)}
              </span>
              <X size={16} />
            </div>
          ))}
        </div>

        <div className="relative">
          <Button
            ref={buttonRef}
            variant="outline"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsOpen(!isOpen)}
          >
            Add Filter
          </Button>

          {/* Filter Dropdown */}
          {isOpen && (
            <div
              ref={dropdownRef}
              className="top-full left-0 z-50 absolute bg-white shadow-xl mt-2 border border-slate-200 rounded-xl w-64 overflow-hidden animate-in duration-200 fade-in zoom-in-95"
            >
              <div className="flex border-slate-100 border-b">
                <button
                  className={cn(
                    "flex-1 px-4 py-2 font-medium text-sm transition-colors",
                    activeTab === "labels"
                      ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50",
                  )}
                  onClick={() => setActiveTab("labels")}
                >
                  Labels
                </button>
                <button
                  className={cn(
                    "flex-1 px-4 py-2 font-medium text-sm transition-colors",
                    activeTab === "locations"
                      ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50",
                  )}
                  onClick={() => setActiveTab("locations")}
                >
                  Locations
                </button>
              </div>

              <div className="p-2 max-h-60 overflow-y-auto">
                {activeTab === "labels" && (
                  <div className="space-y-1">
                    {labels?.map((label) => (
                      <button
                        key={label.id}
                        onClick={() => toggleFilter("labels", label.id)}
                        className="flex justify-between items-center hover:bg-gray-50 px-3 py-2 rounded-md w-full text-sm text-left transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="rounded-full w-2 h-2"
                            style={{ backgroundColor: label.color }}
                          />
                          <span className="text-gray-700">{label.name}</span>
                        </div>
                        {filters.labels.includes(label.id) && (
                          <Check className="w-4 h-4 text-blue-600" />
                        )}
                      </button>
                    ))}
                    {(!labels || labels.length === 0) && (
                      <div className="px-3 py-2 text-gray-500 text-sm text-center">
                        No labels found
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "locations" && (
                  <div className="space-y-1">
                    {locations?.map((location) => (
                      <button
                        key={location.id}
                        onClick={() => toggleFilter("locations", location.id)}
                        className="flex justify-between items-center hover:bg-gray-50 px-3 py-2 rounded-md w-full text-sm text-left transition-colors"
                      >
                        <span className="text-gray-700">{location.name}</span>
                        {filters.locations.includes(location.id) && (
                          <Check className="w-4 h-4 text-blue-600" />
                        )}
                      </button>
                    ))}
                    {(!locations || locations.length === 0) && (
                      <div className="px-3 py-2 text-gray-500 text-sm text-center">
                        No locations found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-medium text-[#334155] text-sm leading-5">
          {/* We could pass total items count here ideally */}
          Items
        </span>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<ArrowDownWideNarrow className="w-4 h-4" />}
        >
          Sort: Updated
        </Button>
      </div>
    </div>
  );
}
