import { InputLoader } from './services/InputLoader';
import { InvoiceCalculator } from './services/InvoiceCalculator';
import { InvoicePrinter } from './services/InvoicePrinter';

function main() {
  const args = process.argv.slice(2);
  const filePath = args[0] || 'usage-data.json';

  try {
    const validEntries = InputLoader.load(filePath);

    if (validEntries.length === 0) {
      console.log('No valid entries found to process.');
      return;
    }

    validEntries.forEach((entry) => {
      const invoice = InvoiceCalculator.calculate(entry);
      InvoicePrinter.print(invoice);
    });
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
