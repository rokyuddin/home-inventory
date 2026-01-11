import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { inventoryApi } from '@/lib/inventory-api';
import { InventoryQueryParams, CreateInventoryPayload, CreateLabelPayload, CreateLocationPayload } from '@/types/inventory';

export function useInventory(params: InventoryQueryParams) {
  return useQuery({
    queryKey: ['inventory', params],
    queryFn: () => inventoryApi.getInventory(params),
    placeholderData: keepPreviousData,
  });
}

export function useCreateInventory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateInventoryPayload) => inventoryApi.createInventory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
    },
  })
}

export function useLabels() {
  return useQuery({
    queryKey: ['labels'],
    queryFn: () => inventoryApi.getLabels(),
  })
}

export function useCreateLabel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateLabelPayload) => inventoryApi.createLabel(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['labels'] })
    },
  })
}

export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: () => inventoryApi.getLocations(),
  })
}

export function useCreateLocation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateLocationPayload) => inventoryApi.createLocation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] })
    },
  })
}
