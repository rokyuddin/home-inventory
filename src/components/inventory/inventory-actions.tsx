"use client";
import { EllipsisVertical, Edit3, Trash2, Eye, CopyPlus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "@/components/ui/dropdown";

import { InventoryItem } from "@/types/inventory";
import { Separator } from "../ui/separator";
import EditItemDrawer from "./edit-item-drawer";
import DeleteItemModal from "./delete-item-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inventoryApi } from "@/lib/inventory-api";
import { Loader2 } from "lucide-react";

export interface InventoryActionsProps {
  item?: InventoryItem;
}

export default function InventoryActions({ item }: InventoryActionsProps) {
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleView = () => {
    router.push(`/dashboard/inventory/${item?.id}`);
  };

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const { mutate: duplicateItem, isPending: isDuplicating } = useMutation({
    mutationFn: async () => {
      if (!item) return;
      await inventoryApi.duplicateInventoryItem(item.id, {
        copyAttachments: true,
        copyCustomFields: true,
        copyMaintenance: true,
        copyPrefix: "Copy of ",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
    onError: (error: Error) => {
      console.error("Failed to duplicate item:", error);
      alert("Failed to duplicate item");
    },
  });

  const handleCopy = () => {
    duplicateItem();
  };

  const handleRemove = () => {
    setIsDeleteOpen(true);
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger className={"border border-[#E2E8F0] p-1.5"}>
          {isDuplicating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <EllipsisVertical className="w-5 h-5" />
          )}
        </DropdownTrigger>

        <DropdownContent align="right">
          <DropdownItem onClick={handleView} icon={<Eye className="size-4" />}>
            View
          </DropdownItem>
          <DropdownItem
            onClick={handleEdit}
            icon={<Edit3 className="size-4" />}
          >
            Edit
          </DropdownItem>
          <DropdownItem
            onClick={handleCopy}
            disabled={isDuplicating}
            icon={
              isDuplicating ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <CopyPlus className="size-4" />
              )
            }
          >
            {isDuplicating ? "Duplicating..." : "Duplicate"}
          </DropdownItem>

          <Separator className="my-1" />

          <DropdownItem
            onClick={handleRemove}
            variant="danger"
            icon={<Trash2 className="size-4" />}
          >
            Remove
          </DropdownItem>
        </DropdownContent>
      </Dropdown>

      {item && (
        <>
          <EditItemDrawer
            item={item}
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
          />
          <DeleteItemModal
            item={item}
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
          />
        </>
      )}
    </>
  );
}
