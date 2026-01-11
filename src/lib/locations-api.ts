import { apiClient } from "./api-client";
import type {
  LocationListItem,
  LocationDetail,
  CreateLocationPayload,
  UpdateLocationPayload,
} from "@/types/location";

export const locationsApi = {
  getLocations: (filterChildren = true) =>
    apiClient.get<LocationListItem[]>("/locations", {
      params: { filterChildren },
    }),

  getLocation: (id: string) =>
    apiClient.get<LocationDetail>(`/locations/${id}`),

  createLocation: (data: CreateLocationPayload) =>
    apiClient.post<LocationDetail>("/locations", data),

  updateLocation: (id: string, data: UpdateLocationPayload) =>
    apiClient.put<LocationDetail>(`/locations/${id}`, data),

  deleteLocation: (id: string) => apiClient.delete(`/locations/${id}`),
};
