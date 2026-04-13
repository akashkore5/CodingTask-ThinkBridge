import { InvoiceCalculator } from '../src/services/InvoiceCalculator';
import { ValidUsageEntry } from '../src/models/UsageData';

describe('InvoiceCalculator', () => {
  test('should calculate correct costs for API calls within tier 1 limit', () => {
    const entry: ValidUsageEntry = {
      CustomerId: 'CUST001',
      API_Calls: 8500,
      Storage_GB: 45.5,
      Compute_Minutes: 150,
    };
    const result = InvoiceCalculator.calculate(entry);
    
    expect(result.apiCost).toBe(85.00);
    expect(result.storageCost).toBe(11.375); // 45.5 * 0.25
    expect(result.computeCost).toBe(7.50);  // 150 * 0.05
    expect(result.totalDue).toBe(103.875);
  });

  test('should calculate correct costs for API calls above tier 1 limit', () => {
    const entry: ValidUsageEntry = {
      CustomerId: 'CUST002',
      API_Calls: 12500,
      Storage_GB: 120,
      Compute_Minutes: 310,
    };
    const result = InvoiceCalculator.calculate(entry);
    
    // Tier 1: 10000 * 0.01 = 100
    // Tier 2: 2500 * 0.008 = 20
    expect(result.apiCost).toBe(120.00);
    expect(result.storageCost).toBe(30.00); // 120 * 0.25
    expect(result.computeCost).toBe(15.50); // 310 * 0.05
    expect(result.totalDue).toBe(165.50);
  });
});
