"use client";

import {
  Edit2,
  Plus,
  Trash2,
  Home,
  ChevronRight,
  Library,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { inventoryApi } from "@/lib/inventory-api";
import { locationsApi } from "@/lib/locations-api";
import { LocationListItem } from "@/types/location";
import { useRouter } from "next/navigation";
import CreateItemModal from "@/components/create-item-modal";

import { LocationActions } from "./location-actions";

interface LocationDetailsProps {
  location: LocationListItem;
  locationId: string;
  onEdit: () => void;
  onAddChild: (parentId: string) => void;
  onDeleteSuccess: () => void;
}

export function LocationDetails({
  location: selectedLocation,
  locationId,
  onEdit,
  onAddChild,
  onDeleteSuccess,
}: LocationDetailsProps) {
  const router = useRouter();
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const { data: location, isLoading: isLocationLoading } = useQuery({
    queryKey: ["location", locationId],
    queryFn: () => locationsApi.getLocation(locationId),
  });

  const { data: itemsResponse, isLoading: isItemsLoading } = useQuery({
    queryKey: ["location-items", locationId],
    queryFn: () => inventoryApi.getInventory({ locations: [locationId] }),
  });

  if (isLocationLoading) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <div className="text-slate-400">Loading details...</div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <div className="text-slate-400">Location not found.</div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-8 overflow-y-auto">
      {/* Location Detail Card */}
      <div className="bg-white shadow-sm p-6 border border-slate-200 rounded-2xl">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4">
            <div className="flex justify-center items-center bg-emerald-50 rounded-xl size-14">
              <Library className="size-7 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-2xl">
                {location.name}
              </h2>
              <div className="flex items-center gap-2 mt-1 font-medium text-slate-500 text-sm">
                <Home className="size-4" />
                <span>Home</span>
                {location.parent && (
                  <>
                    <ChevronRight className="size-3" />
                    <span>{location.parent.name}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <LocationActions
            locationId={locationId}
            locationName={location.name}
            onEdit={onEdit}
            onAddChild={() => onAddChild(locationId)}
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>

        <div className="mb-8">
          <h4 className="mb-2 font-bold text-[11px] text-slate-400 uppercase tracking-wider">
            Description
          </h4>
          <p className="max-w-2xl text-[15px] text-slate-600 leading-relaxed">
            {location.description || "No description provided."}
          </p>
        </div>

        <div className="grid grid-cols-3 pt-6 border-slate-100 border-t">
          <div>
            <h4 className="mb-1 font-bold text-[11px] text-slate-400 uppercase tracking-wider">
              Items
            </h4>
            <p className="font-bold text-slate-900 text-2xl">
              {itemsResponse?.items?.length || 0}
            </p>
          </div>
          <div>
            <h4 className="mb-1 font-bold text-[11px] text-slate-400 uppercase tracking-wider">
              Total Value
            </h4>
            <p className="font-bold text-slate-900 text-2xl">
              ${location.totalPrice?.toFixed(2) || "0.00"}
            </p>
          </div>
          <div>
            <h4 className="mb-1 font-bold text-[11px] text-slate-400 uppercase tracking-wider">
              Created
            </h4>
            <p className="mt-2 font-semibold text-[15px] text-slate-500">
              {new Date(location.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Items in Location Card */}
      <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-slate-100 border-b">
          <h3 className="font-bold text-slate-900 text-lg">
            Items in this Location
          </h3>
          <button
            onClick={() => {
              router.push(`/dashboard/inventory?locationId=${locationId}`);
            }}
            className="flex items-center gap-1 font-bold text-blue-600 text-sm hover:underline"
          >
            View All <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="space-y-4 p-6">
          {isItemsLoading ? (
            <div className="py-4 text-slate-400 text-center">
              Loading items...
            </div>
          ) : itemsResponse?.items.length === 0 ? (
            <div className="py-4 text-slate-400 text-center">
              No items found in this location.
            </div>
          ) : (
            itemsResponse?.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 border border-slate-100 hover:border-slate-200 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex justify-center items-center bg-indigo-50 rounded-lg size-12">
                    <Package className="size-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.name}</h4>
                    <p className="font-medium text-slate-500 text-sm">
                      {item.labels?.map((label) => label.name).join(", ") ||
                        "No Category"}{" "}
                      • Added {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">
                    ${item.soldPrice?.toFixed(2) || "0.00"}
                  </p>
                  <Badge variant="success" className="mt-2">
                    Good
                  </Badge>
                </div>
              </div>
            ))
          )}

          <button
            onClick={() => setIsAddItemModalOpen(true)}
            className="flex justify-center items-center gap-2 hover:bg-primary/5 mt-2 py-4 rounded-xl w-full font-bold text-primary transition-colors"
          >
            <Plus className="size-5" />
            Add Item to this Location
          </button>
        </div>
      </div>

      <CreateItemModal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        initialLocationId={locationId}
      />
    </div>
  );
}
