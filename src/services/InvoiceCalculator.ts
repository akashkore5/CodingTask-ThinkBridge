import { PRICING } from '../config/pricing';
import { ValidUsageEntry, InvoiceDetail } from '../models/UsageData';

export class InvoiceCalculator {
  public static calculate(entry: ValidUsageEntry): InvoiceDetail {
    const apiCost = this.calculateApiCost(entry.API_Calls);
    const storageCost = entry.Storage_GB * PRICING.STORAGE.RATE_PER_GB;
    const computeCost = entry.Compute_Minutes * PRICING.COMPUTE.RATE_PER_MINUTE;
    const totalDue = apiCost + storageCost + computeCost;

    return {
      customerId: entry.CustomerId,
      apiCalls: entry.API_Calls,
      apiCost,
      storageGB: entry.Storage_GB,
      storageCost,
      computeMinutes: entry.Compute_Minutes,
      computeCost,
      totalDue,
    };
  }

  private static calculateApiCost(calls: number): number {
    if (calls <= PRICING.API_CALLS.TIER_LIMIT) {
      return calls * PRICING.API_CALLS.TIER_1_RATE;
    } else {
      const tier1Cost = PRICING.API_CALLS.TIER_LIMIT * PRICING.API_CALLS.TIER_1_RATE;
      const tier2Cost = (calls - PRICING.API_CALLS.TIER_LIMIT) * PRICING.API_CALLS.TIER_2_RATE;
      return tier1Cost + tier2Cost;
    }
  }
}
