"use client";

import { Button } from "./ui/button";
import { InventoryItem } from "../types/inventory";
import { inventoryApi } from "../lib/inventory-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, AlertTriangle } from "lucide-react";
import { Dialog } from "./ui/dialog";

interface DeleteItemModalProps {
  item?: InventoryItem;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DeleteItemModal({
  item,
  isOpen,
  onClose,
  onSuccess,
}: DeleteItemModalProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!item) return;
      await inventoryApi.deleteInventoryItem(item.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      queryClient.invalidateQueries({ queryKey: ["inventory", item?.id] });
      if (onSuccess) onSuccess();
      onClose();
    },
    onError: (error) => {
      console.error("Failed to delete item:", error);
      alert("Failed to delete item");
    },
  });

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Delete Item">
      <div className="space-y-4">
        <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-lg text-amber-600">
          <AlertTriangle className="size-5 shrink-0" />
          <p className="font-medium text-sm">This action cannot be undone.</p>
        </div>

        <p className="text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900">{item?.name}</span>?
          This will permanently remove the item from your inventory.
        </p>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="ghost"
            className="bg-red-600 hover:bg-red-700 text-white hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              mutate();
            }}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
