"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import type { LocationListItem, CreateLocationPayload } from "@/types/location";

interface LocationFormProps {
  initialData?: Partial<LocationListItem>;
  locations: LocationListItem[];
  onSubmit: (data: CreateLocationPayload) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function LocationForm({
  initialData,
  locations,
  onSubmit,
  onCancel,
  isSubmitting,
}: LocationFormProps) {
  const [formData, setFormData] = useState<CreateLocationPayload>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    parentId: (initialData as any)?.parentId || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData({
      name: initialData?.name || "",
      description: initialData?.description || "",
      parentId: (initialData as any)?.parentId || "",
    });
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold text-slate-700 text-sm">
            Location Name
          </label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Living Room, Garage"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-slate-700 text-sm">
            Parent Location
          </label>
          <select
            name="parentId"
            value={formData.parentId || ""}
            onChange={handleChange}
            className="bg-white px-4 border border-slate-200 focus:border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 w-full h-12 text-slate-900 transition-all appearance-none"
          >
            <option value="">No Parent (Root)</option>
            {locations
              .filter((l) => l.id !== initialData?.id)
              .map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-slate-700 text-sm">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="bg-white px-4 py-3 border border-slate-200 focus:border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-slate-900 transition-all resize-none"
            placeholder="Describe this location..."
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          disabled={isSubmitting}
        >
          {initialData?.id ? "Update Location" : "Create Location"}
        </Button>
      </div>
    </form>
  );
}
