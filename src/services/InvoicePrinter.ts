import { InvoiceDetail } from '../models/UsageData';

export class InvoicePrinter {
  public static print(invoice: InvoiceDetail): void {
    console.log(`Invoice for Customer: ${invoice.customerId}`);
    console.log(`-----------------------------`);
    console.log(`API Calls: ${invoice.apiCalls} calls -> $${invoice.apiCost.toFixed(2)}`);
    console.log(`Storage: ${invoice.storageGB} GB -> $${invoice.storageCost.toFixed(2)}`);
    console.log(`Compute Time: ${invoice.computeMinutes} minutes -> $${invoice.computeCost.toFixed(2)}`);
    console.log(`-----------------------------`);
    console.log(`Total Due: $${invoice.totalDue.toFixed(2)}`);
    console.log(`\n`);
  }
}
