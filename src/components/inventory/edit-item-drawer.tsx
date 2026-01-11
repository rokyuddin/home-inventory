"use client";

import { useState, useEffect } from "react";
import { Drawer } from "../ui/drawer";
import { Button } from "../ui/button";
import Input from "../ui/input";
import { InventoryItem, CreateInventoryPayload } from "../../types/inventory";
import { inventoryApi } from "../../lib/inventory-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useLabels, useLocations } from "@/hooks/use-inventory";
import { Select } from "../ui/select";

interface EditItemDrawerProps {
  item?: InventoryItem;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function EditItemDrawer({
  item,
  isOpen,
  onClose,
  onSuccess,
}: EditItemDrawerProps) {
  const [formData, setFormData] = useState<Partial<CreateInventoryPayload>>({});
  const queryClient = useQueryClient();
  const { data: locations } = useLocations();
  const { data: labels } = useLabels();

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description || "",
        quantity: item.quantity,
        purchasePrice: item.purchasePrice || 0,
        locationId: item.location?.id,
        labelIds: item.labels?.map((l) => l.id) || [],
      });
    }
  }, [item]);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!item) return;
      await inventoryApi.updateInventoryItem(item.id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      queryClient.invalidateQueries({ queryKey: ["inventory", item?.id] });
      if (onSuccess) onSuccess();
      onClose();
    },
    onError: (error) => {
      console.error("Failed to update item:", error);
      // You would typically show a toast here
      alert("Failed to update item");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Inventory Item"
      className="w-full md:max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div className="space-y-2">
          <label className="font-medium text-gray-700 text-sm">Name</label>
          <Input
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Item Name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium text-gray-700 text-sm">
            Description
          </label>
          <textarea
            className="bg-[#F9FAFB] px-4 py-3 border border-[#D1D5DB] focus:border-primary rounded-lg outline-none focus:ring-2 focus:ring-primary/20 w-full min-h-[100px] text-[#111827] placeholder:text-[#9CA3AF] transition-all"
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Item Description"
          />
        </div>

        <div className="gap-4 grid grid-cols-2">
          <div className="space-y-2">
            <label className="font-medium text-gray-700 text-sm">
              Quantity
            </label>
            <Input
              type="number"
              value={formData.quantity || 0}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  quantity: parseInt(e.target.value) || 0,
                })
              }
              }
              placeholder="0"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-700 text-sm">
              Purchase Price
            </label>
            <Input
              type="number"
              value={formData.purchasePrice || 0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  purchasePrice: parseFloat(e.target.value) || 0,
                })
              }
              placeholder="0.00"
              step="0.01"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block font-medium text-gray-700 text-sm">
            Location
          </label>
          <Select
            value={formData.locationId || ""}
            onChange={(e) =>
              setFormData({ ...formData, locationId: e.target.value })
            }
            options={
              locations?.map((l) => ({ label: l.name, value: l.id })) || []
            }
            required
            placeholder="Select a location"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium text-gray-700 text-sm">
            Labels
          </label>
          <select
            multiple
            className="block px-3 py-2 border border-gray-300 focus:border-blue-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-24 text-gray-900 sm:text-sm"
            value={formData.labelIds || []}
            onChange={(e) => {
              const selectedOptions = Array.from(
                e.target.selectedOptions,
                (option) => option.value,
              );
              setFormData({ ...formData, labelIds: selectedOptions });
            }}
          >
            {labels?.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
          <p className="text-gray-500 text-xs">
            Hold Ctrl/Cmd to select multiple
          </p>
        </div>

        <div className="bottom-0 sticky flex justify-end gap-3 bg-white mt-auto pt-4 pb-4 border-t">
          <Button
            variant="outline"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Drawer>
  );
}
