import * as fs from 'fs';
import { UsageEntry, ValidUsageEntry } from '../models/UsageData';

export class InputLoader {
  public static load(filePath: string): ValidUsageEntry[] {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const rawData = fs.readFileSync(filePath, 'utf-8');
    const entries: any[] = JSON.parse(rawData);
    const validEntries: ValidUsageEntry[] = [];

    entries.forEach((entry, index) => {
      const validationError = this.validateEntry(entry);
      if (validationError) {
        console.warn(`Skipped invalid entry: ${validationError} for CustomerId: ${entry.CustomerId || 'Unknown'}`);
      } else {
        validEntries.push({
          CustomerId: entry.CustomerId,
          API_Calls: entry.API_Calls,
          Storage_GB: entry.Storage_GB,
          Compute_Minutes: entry.Compute_Minutes,
        });
      }
    });

    return validEntries;
  }

  private static validateEntry(entry: any): string | null {
    if (!entry.CustomerId || typeof entry.CustomerId !== 'string') {
      return 'Missing or invalid CustomerId';
    }
    if (entry.API_Calls === undefined || entry.API_Calls === null || typeof entry.API_Calls !== 'number') {
      return 'Missing or invalid API_Calls';
    }
    if (entry.Storage_GB === undefined || entry.Storage_GB === null || typeof entry.Storage_GB !== 'number') {
      return 'Missing or invalid Storage_GB';
    }
    if (entry.Compute_Minutes === undefined || entry.Compute_Minutes === null || typeof entry.Compute_Minutes !== 'number') {
      return 'Missing or invalid Compute_Minutes';
    }
    return null;
  }
}
