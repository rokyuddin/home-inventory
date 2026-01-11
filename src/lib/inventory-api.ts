import { apiClient } from './api-client';
import { InventoryQueryParams, InventoryResponse, CreateInventoryPayload, InventoryItem, Label, CreateLabelPayload, Location, CreateLocationPayload } from '@/types/inventory';

export const inventoryApi = {
  getInventory: async (params: InventoryQueryParams): Promise<InventoryResponse> => {
    // Convert array params to undefined if empty to avoid sending empty params if not needed,
    // or keep them if the API supports it. 
    // The apiClient expects params as Record<string, string>, but URLSearchParams can handle arrays if we pass them correctly.
    // However, the current apiClient implementation takes Record<string, string>.
    // Let's check apiClient implementation again.
    // It says: params?: Record<string, string>;
    // and invokes: const searchParams = new URLSearchParams(params);
    // new URLSearchParams({ foo: ['a', 'b'] }) -> foo=a,b (comma separated) in some envs or just toString().
    // Actually TypeScript Record<string, string> won't allow string[].
    
    // We need to modify apiClient or pre-process params.
    // Let's modify the params here to be string compatible.
    
    const formattedParams: Record<string, string> = {};
    if (params.page) formattedParams.page = params.page.toString();
    if (params.pageSize) formattedParams.pageSize = params.pageSize.toString();
    if (params.q) formattedParams.q = params.q;
    
    // For arrays, usually APIs allow repeated keys (foo=a&foo=b) or comma separated (foo=a,b).
    // The provided query params image shows "array[string]".
    // `api-client.ts` uses `new URLSearchParams(params)`.
    // If we pass `labels: "a,b"`, it becomes `labels=a%2Cb`.
    // If the API expects repeated keys, `api-client.ts` needs upgrade or we assume comma separated for now?
    // Given the `api-client.ts` definition `params?: Record<string, string>`, it ONLY supports 1:1 mapping.
    // I will assume comma separated for now or JSON stringified? Usually comma separated for simple arrays.
    // But strict `Record<string, string>` prevents passing array.
    
    if (params.labels?.length) formattedParams.labels = params.labels.join(',');
    if (params.locations?.length) formattedParams.locations = params.locations.join(',');
    if (params.parentIds?.length) formattedParams.parentIds = params.parentIds.join(',');

    return apiClient.get<InventoryResponse>('items', { params: formattedParams });
  },

  getItem: async (id: string) => {
    return apiClient.get<any>(`items/${id}`);
  },

  createInventory: async (payload: CreateInventoryPayload): Promise<InventoryItem> => {
    return apiClient.post('/items', payload)
  },

  getLabels: async (): Promise<Label[]> => {
    return apiClient.get('/labels')
  },

  createLabel: async (payload: CreateLabelPayload): Promise<Label> => {
    return apiClient.post('/labels', payload)
  },

  getLocations: async (): Promise<Location[]> => {
    return apiClient.get('/locations')
  },

  createLocation: async (payload: CreateLocationPayload): Promise<Location> => {
    return apiClient.post('/locations', payload)
  }
};
