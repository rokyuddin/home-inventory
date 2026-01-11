export interface LocationListItem {
  id: string;
  name: string;
  type: "location" | "item";
  children?: LocationListItem[];
  // Optional fields that might be missing in tree view but present in detail
  description?: string;
  itemCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface LocationDetail {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  children: LocationListItem[];
  parent?: {
    id: string;
    name: string;
  };
}

export interface CreateLocationPayload {
  name: string;
  description: string;
  parentId?: string;
}

export interface UpdateLocationPayload extends Partial<CreateLocationPayload> {}
