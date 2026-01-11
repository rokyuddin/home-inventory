"use client";

import { useState, useEffect } from "react";
import {
  useCreateInventory,
  useLabels,
  useLocations,
} from "@/hooks/use-inventory";
import Input from "./ui/input";
import { Button } from "./ui/button";
import { Select } from "./ui/select";
import { Loader2 } from "lucide-react";
import { Drawer } from "./ui/drawer";

interface CreateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLocationId?: string;
}

export default function CreateItemModal({
  isOpen,
  onClose,
  initialLocationId,
}: CreateItemModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [locationId, setLocationId] = useState(initialLocationId || "");
  const [labelIds, setLabelIds] = useState<string[]>([]);

  // Reset locationId when initialLocationId changes or modal opens
  useEffect(() => {
    if (isOpen && initialLocationId) {
      setLocationId(initialLocationId);
    }
  }, [isOpen, initialLocationId]);

  const { data: locations } = useLocations();
  const { data: labels } = useLabels();
  const createInventoryMutation = useCreateInventory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quantity || !locationId) return;

    try {
      await createInventoryMutation.mutateAsync({
        name,
        description,
        quantity: Number(quantity),
        locationId,
        labelIds: labelIds,
      });
      onClose();
      // Reset form
      setName("");
      setDescription("");
      setQuantity(1);
      setLocationId("");
      setLabelIds([]);
    } catch (error) {
      console.error("Failed to create item", error);
    }
  };

  // Handle multi-select for labels (simplified as native multiple select)
  const handleLabelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setLabelIds(selectedOptions);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Add New Item">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="block font-medium text-gray-700 text-sm">
            Name
          </label>
          <Input
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder="Item name"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block font-medium text-gray-700 text-sm">
            Description
          </label>
          <Input
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            placeholder="Description (optional)"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-medium text-gray-700 text-sm">
            Quantity
          </label>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuantity(e.target.valueAsNumber || 0)
            }
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block font-medium text-gray-700 text-sm">
            Location
          </label>
          <Select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            options={
              locations?.map((l) => ({ label: l.name, value: l.id })) || []
            }
            required
            placeholder="Select a location"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-medium text-gray-700 text-sm">
            Labels
          </label>
          <select
            multiple
            className="block px-3 py-2 border border-gray-300 focus:border-blue-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full h-24 text-gray-900 sm:text-sm"
            value={labelIds}
            onChange={handleLabelChange}
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

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={createInventoryMutation.isPending}>
            {createInventoryMutation.isPending && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            Create Item
          </Button>
        </div>
      </form>
    </Drawer>
  );
}
