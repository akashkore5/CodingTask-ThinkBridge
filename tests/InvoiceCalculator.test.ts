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

  test('should correctly calculate exact boundary limit of 10,000 API calls', () => {
    const entry: ValidUsageEntry = {
      CustomerId: 'CUST-BOUNDARY',
      API_Calls: 10000,
      Storage_GB: 10,
      Compute_Minutes: 0,
    };
    const result = InvoiceCalculator.calculate(entry);
    
    expect(result.apiCost).toBe(100.00); // exactly 10000 * 0.01
    expect(result.storageCost).toBe(2.50); // 10 * 0.25
    expect(result.computeCost).toBe(0); 
    expect(result.totalDue).toBe(102.50);
  });

  test('should return zero costs when usage is entirely zero', () => {
    const entry: ValidUsageEntry = {
      CustomerId: 'CUST-ZERO',
      API_Calls: 0,
      Storage_GB: 0,
      Compute_Minutes: 0,
    };
    const result = InvoiceCalculator.calculate(entry);
    
    expect(result.apiCost).toBe(0);
    expect(result.storageCost).toBe(0);
    expect(result.computeCost).toBe(0);
    expect(result.totalDue).toBe(0);
  });

  test('should handle very high usage correctly', () => {
    const entry: ValidUsageEntry = {
      CustomerId: 'CUST-HIGH',
      API_Calls: 1000000,
      Storage_GB: 5000,
      Compute_Minutes: 10000, // Roughly a week of compute
    };
    const result = InvoiceCalculator.calculate(entry);
    
    // Tier 1: 10,000 * 0.01 = 100
    // Tier 2: 990,000 * 0.008 = 7920
    expect(result.apiCost).toBe(8020.00);
    expect(result.storageCost).toBe(1250.00); // 5000 * 0.25
    expect(result.computeCost).toBe(500.00); // 10000 * 0.05
    expect(result.totalDue).toBe(9770.00);
  });
});
