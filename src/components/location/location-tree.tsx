"use client";

import {
  ChevronRight,
  ChevronDown,
  MapPin,
  Search,
  Package,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LocationListItem } from "@/types/location";

interface LocationTreeProps {
  locations: LocationListItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onAdd: (parentId?: string) => void;
  isLoading: boolean;
}

export function LocationTree({
  locations,
  selectedId,
  onSelect,
  onAdd,
  isLoading,
}: LocationTreeProps) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-3 sm:gap-4 bg-white p-3 sm:p-4 border-slate-200 lg:border-r w-full lg:w-80 h-full overflow-hidden">
      <div className="relative">
        <Search className="top-1/2 left-3 absolute size-4 text-slate-400 -translate-y-1/2" />
        <Input
          placeholder="Search locations..."
          className="bg-slate-50 pl-10 border-slate-200 text-sm sm:text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Button
        variant="primary"
        size="lg"
        className="gap-2"
        onClick={() => onAdd()}
      >
        <MapPin className="size-5" />
        New Location
      </Button>

      <div className="flex-1 space-y-1 mt-2 overflow-y-auto">
        {isLoading ? (
          <div className="py-8 text-slate-400 text-sm text-center">
            Loading locations...
          </div>
        ) : filteredLocations.length === 0 ? (
          <div className="py-8 text-slate-400 text-sm text-center">
            No locations found.
          </div>
        ) : (
          filteredLocations.map((loc) => (
            <LocationItem
              key={loc.id}
              location={loc}
              selectedId={selectedId}
              onSelect={onSelect}
              expanded={expanded}
              onToggleExpand={toggleExpand}
            />
          ))
        )}
      </div>
    </div>
  );
}

function LocationItem({
  location,
  selectedId,
  onSelect,
  expanded,
  onToggleExpand,
  level = 0,
}: {
  location: LocationListItem;
  selectedId?: string;
  onSelect: (id: string) => void;
  expanded: Record<string, boolean>;
  onToggleExpand: (e: React.MouseEvent, id: string) => void;
  level?: number;
}) {
  const isSelected = selectedId === location.id;
  const isExpanded = expanded[location.id];
  const hasChildren = location.children && location.children.length > 0;
  const isLocation = location.type === "location";

  return (
    <div className="space-y-1">
      <div
        className={cn(
          "group flex justify-between items-center p-2 rounded-lg transition-colors cursor-pointer",
          isSelected
            ? "bg-primary/5 text-primary"
            : "hover:bg-slate-50 text-slate-700",
          !isLocation && "cursor-default opacity-80",
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => {
          if (isLocation) {
            onSelect(location.id);
          }
        }}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {hasChildren ? (
            <button
              onClick={(e) => onToggleExpand(e, location.id)}
              className="hover:bg-black/5 p-1 rounded shrink-0"
            >
              {isExpanded ? (
                <ChevronDown className="size-4 text-slate-400" />
              ) : (
                <ChevronRight className="size-4 text-slate-400" />
              )}
            </button>
          ) : (
            <div className="w-6 size-4 shrink-0" /> // Spacer
          )}
          {isLocation ? (
            <MapPin
              className={cn(
                "size-4 shrink-0",
                isSelected ? "text-primary" : "text-slate-400",
              )}
            />
          ) : (
            <Package className="size-4 text-slate-300 shrink-0" />
          )}
          <span
            className={cn(
              "font-medium text-[14px] truncate",
              !isLocation && "text-slate-500 font-normal",
            )}
          >
            {location.name}
          </span>
        </div>
        {location.itemCount !== undefined && isLocation && (
          <Badge
            className={cn(
              "px-2 rounded-full font-medium text-[11px] shrink-0",
              isSelected
                ? "bg-primary/10 text-primary"
                : "bg-slate-100 text-slate-500",
            )}
          >
            {location.itemCount}
          </Badge>
        )}
      </div>

      {isExpanded && hasChildren && (
        <div className="mt-1">
          {location.children?.map((child) => (
            <LocationItem
              key={child.id}
              location={child}
              selectedId={selectedId}
              onSelect={onSelect}
              expanded={expanded}
              onToggleExpand={onToggleExpand}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
