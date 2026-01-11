export interface Label {
  id: string;
  name: string;
  color: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  id: string;
  assetId?: string; // It says assetId in response
  name: string;
  description?: string;
  imageId?: string;
  thumbnailId?: string;
  insured?: boolean;
  purchasePrice?: number;
  quantity: number;
  soldTime?: string;
  location?: Location;
  labels?: Label[];
  createdAt: string;
  updatedAt: string;
  // properties form original component for compatibility or computed
  model?: string; // Not in API response, maybe in description or custom fields?
  image?: string; // computed from imageId/thumbnailId
}

export interface InventoryResponse {
  items: InventoryItem[];
  page: number;
  pageSize: number;
  total: number;
}

export interface InventoryQueryParams {
  page?: number;
  pageSize?: number;
  q?: string; // search string
  labels?: string[]; // label Ids
  locations?: string[]; // location Ids
  parentIds?: string[]; // parent Ids
}

export interface CreateInventoryPayload {
  name: string;
  description?: string;
  quantity: number;
  locationId: string;
  labelIds: string[];
  parentId?: string;
}

export interface CreateLabelPayload {
  name: string;
  color?: string;
  description?: string;
}

export interface CreateLocationPayload {
  name: string;
  description?: string;
  parentId?: string;
}
