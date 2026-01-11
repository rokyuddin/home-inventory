"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit2, Trash2, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { locationsApi } from "@/lib/locations-api";

interface LocationActionsProps {
    locationId: string;
    locationName: string;
    onEdit: () => void;
    onAddChild: () => void;
    onDeleteSuccess?: () => void;
}

export function LocationActions({
    locationId,
    locationName,
    onEdit,
    onAddChild,
    onDeleteSuccess,
}: LocationActionsProps) {
    const queryClient = useQueryClient();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const deleteMutation = useMutation({
        mutationFn: (id: string) => locationsApi.deleteLocation(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["locations"] });
            onDeleteSuccess?.();
            setIsDeleteDialogOpen(false);
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate(locationId);
    };

    return (
        <div className="flex gap-2">
            <Button
                variant="outline"
                className="gap-2 border-slate-200 text-slate-600"
                onClick={onEdit}
            >
                <Edit2 className="size-4" />
                Edit
            </Button>
            <Button
                variant="outline"
                className="gap-2 bg-primary/10 border-slate-200 text-primary"
                onClick={onAddChild}
            >
                <Plus className="size-4" />
                Add Child
            </Button>
            <Button
                variant="outline"
                className="gap-2 bg-red-50/50 hover:bg-red-50 border-slate-200 text-red-500"
                onClick={() => setIsDeleteDialogOpen(true)}
            >
                <Trash2 className="size-4" />
                Delete
            </Button>

            <Dialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                title="Delete Location"
            >
                <div className="space-y-4">
                    <div className="flex items-start gap-3 bg-red-50 p-3 rounded-lg text-red-800">
                        <AlertCircle className="mt-0.5 size-5" />
                        <div className="text-sm">
                            <p className="font-semibold">Are you sure?</p>
                            <p>
                                You are about to delete <strong>{locationName}</strong>. This
                                action cannot be undone and will delete all information
                                associated with this location.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            disabled={deleteMutation.isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                            isLoading={deleteMutation.isPending}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete Location
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
