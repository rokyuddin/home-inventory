"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { locationsApi } from "@/lib/locations-api";
import { LocationTree } from "./location-tree";
import { LocationDetails } from "./location-details";
import { LocationDrawer } from "./location-drawer";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Package } from "lucide-react";
import type { CreateLocationPayload, LocationListItem } from "@/types/location";

export function LocationsContent() {
    const queryClient = useQueryClient();
    const [selectedId, setSelectedId] = useState<string | undefined>();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingLocation, setEditingLocation] = useState<
        LocationListItem | undefined
    >();
    const [parentForNewSub, setParentForNewSub] = useState<string | undefined>();

    const { data: locations = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["locations"],
        queryFn: () => locationsApi.getLocations(),
    });

    const createMutation = useMutation({
        mutationFn: (data: CreateLocationPayload) =>
            locationsApi.createLocation(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["locations"] });
            setDrawerOpen(false);
            resetDrawer();
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: CreateLocationPayload }) =>
            locationsApi.updateLocation(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["locations"] });
            queryClient.invalidateQueries({
                queryKey: ["location", editingLocation?.id],
            });
            setDrawerOpen(false);
            resetDrawer();
        },
    });



    const handleCreate = (data: CreateLocationPayload) => {
        if (editingLocation) {
            updateMutation.mutate({ id: editingLocation.id, data });
        } else {
            createMutation.mutate(data);
        }
    };

    const resetDrawer = () => {
        setEditingLocation(undefined);
        setParentForNewSub(undefined);
    };

    const openCreate = (parentId?: string) => {
        resetDrawer();
        setParentForNewSub(parentId);
        setDrawerOpen(true);
    };

    const openEdit = () => {
        const loc = locations.find((l) => l.id === selectedId);
        if (loc) {
            setEditingLocation(loc);
            setDrawerOpen(true);
        }
    };

    return (
        <div className="flex flex-1 overflow-hidden">
            <LocationTree
                locations={locations}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onAdd={openCreate}
                isLoading={isLoading}
            />

            {isError ? (
                <div className="flex flex-col flex-1 justify-center items-center bg-slate-50">
                    <div className="bg-red-50 mb-4 p-4 rounded-full">
                        <AlertCircle className="size-10 text-red-500" />
                    </div>
                    <h3 className="mb-2 font-semibold text-slate-900 text-lg">
                        Failed to load locations
                    </h3>
                    <p className="mb-6 px-4 max-w-md text-slate-500 text-center">
                        {error instanceof Error ? error.message : "Could not fetch locations. Please check your connection and try again."}
                    </p>
                    <Button
                        onClick={() => refetch()}
                        leftIcon={<RefreshCcw size={18} />}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        Try Again
                    </Button>
                </div>
            ) : selectedId ? (
                <LocationDetails
                    location={
                        locations.find((l) => l.id === selectedId) as LocationListItem
                    }
                    locationId={selectedId}
                    onEdit={openEdit}
                    onAddChild={openCreate}
                    onDeleteSuccess={() => setSelectedId(undefined)}
                />
            ) : (
                <div className="flex flex-1 justify-center items-center bg-slate-50">
                    <div className="text-center">
                        <div className="flex justify-center items-center bg-slate-100 mx-auto mb-4 rounded-full size-16">
                            <Package className="size-8 text-slate-400" />
                        </div>
                        <h3 className="font-semibold text-slate-900 text-lg">
                            Select a location
                        </h3>
                        <p className="text-slate-500">
                            Choose a location from the list to see its details and items.
                        </p>
                    </div>
                </div>
            )}

            <LocationDrawer
                isOpen={drawerOpen}
                onClose={() => {
                    setDrawerOpen(false);
                    resetDrawer();
                }}
                onSubmit={handleCreate}
                locations={locations}
                initialData={
                    editingLocation
                        ? editingLocation
                        : parentForNewSub
                            ? ({ parentId: parentForNewSub } as any)
                            : undefined
                }
                isSubmitting={createMutation.isPending || updateMutation.isPending}
            />
        </div>
    );
}

// Redundant Package import removed (moved to top)
