export interface Attachment {
  id: string;
  path: string;
  mimeType: string;
  thumbnail?: {
    path: string;
  };
  primary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CustomField {
  id: string;
  name: string;
  type: string;
  textValue?: string;
  numberValue?: number;
  booleanValue?: boolean;
}

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
  assetId?: string;
  name: string;
  description?: string;
  archived?: boolean;
  insured?: boolean;
  manufacturer?: string;
  modelNumber?: string;
  serialNumber?: string;
  purchasePrice?: number;
  purchaseFrom?: string;
  purchaseTime?: string;
  quantity: number;
  soldTime?: string;
  soldPrice?: number;
  soldTo?: string;
  soldNotes?: string;
  warrantyExpires?: string;
  warrantyDetails?: string;
  notes?: string;
  location?: Location;
  labels?: Label[];
  fields?: CustomField[];
  attachments?: Attachment[];
  createdAt: string;
  updatedAt: string;
  // Computed or compat properties
  image?: string;
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
  q?: string;
  labels?: string[];
  locations?: string[];
  parentIds?: string[];
}

export interface CreateInventoryPayload {
  name: string;
  description?: string;
  quantity: number;
  locationId: string;
  labelIds: string[];
  parentId?: string;
  manufacturer?: string;
  modelNumber?: string;
  serialNumber?: string;
  purchasePrice?: number;
  purchaseFrom?: string;
  purchaseTime?: string;
  warrantyExpires?: string;
  warrantyDetails?: string;
  notes?: string;
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

export interface DuplicateInventoryPayload {
  copyAttachments: boolean;
  copyCustomFields: boolean;
  copyMaintenance: boolean;
  copyPrefix: string;
}
