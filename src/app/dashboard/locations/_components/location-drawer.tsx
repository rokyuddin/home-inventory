"use client";

import { Drawer } from "@/components/ui/drawer";
import { LocationForm } from "./location-form";
import type { LocationListItem, CreateLocationPayload } from "@/types/location";

interface LocationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateLocationPayload) => void;
  locations: LocationListItem[];
  initialData?: LocationListItem;
  isSubmitting: boolean;
}

export function LocationDrawer({
  isOpen,
  onClose,
  onSubmit,
  locations,
  initialData,
  isSubmitting,
}: LocationDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Location" : "Create New Location"}
    >
      <LocationForm
        initialData={initialData}
        locations={locations}
        onSubmit={onSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Drawer>
  );
}
