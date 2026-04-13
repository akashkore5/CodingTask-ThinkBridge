export interface UsageEntry {
  CustomerId: string | null;
  API_Calls: number | string | null;
  Storage_GB: number | string | null;
  Compute_Minutes: number | string | null;
}

export interface ValidUsageEntry {
  CustomerId: string;
  API_Calls: number;
  Storage_GB: number;
  Compute_Minutes: number;
}

export interface InvoiceDetail {
  customerId: string;
  apiCalls: number;
  apiCost: number;
  storageGB: number;
  storageCost: number;
  computeMinutes: number;
  computeCost: number;
  totalDue: number;
}
