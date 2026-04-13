# Usage-Based Invoicing System

A robust, modular console application built with TypeScript and Node.js that processes customer usage data, validates inputs, and generates detailed invoices based on tier-based pricing rules.

## 🚀 Features

- **Automated Invoicing**: Computes charges for API calls, storage, and compute time.
- **Robust Validation**: Gracefully handles malformed or missing data with informative warnings.
- **Modular Architecture**: Clean separation of concerns following SOLID principles:
  - `InputLoader`: Handles file parsing and data validation.
  - `InvoiceCalculator`: Core logic for pricing rules and cost calculation.
  - `InvoicePrinter`: Formats and displays invoices to the console.
- **Tiered Pricing**: Implements volume-based discounts for API usage.
- **CLI Support**: Accept custom JSON file paths via command-line arguments.
- **Unit Testing**: Comprehensive test suite ensuring accuracy of financial calculations.

## 🛠️ Tech Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **Testing Framework**: Jest
- **Execution Tool**: ts-node

## 💰 Pricing Logic

| Service | Rate |
| :--- | :--- |
| **API Calls** | First 10,000: $0.01/call |
| | Above 10,000: $0.008/call |
| **Storage** | $0.25 per GB |
| **Compute Time** | $0.05 per minute |

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm (installed with Node)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-link>
   cd coding-task
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

You can run the application using the default `usage-data.json` file or provide a custom path.

**Option 1: Default run**
```bash
npm start
```

**Option 2: Custom JSON file**
```bash
npm start -- usage-data.json
```

### Running Tests

To verify the calculation logic and robustness of the system:
```bash
npm test
```

## 📂 Project Structure

```text
├── src/
│   ├── config/       # Pricing constants and configuration
│   ├── models/       # TypeScript interfaces (UsageData, Invoice)
│   ├── services/     # Business logic (InputLoader, Calculator, Printer)
│   └── index.ts      # Application entry point
├── tests/            # Unit tests for core services
├── usage-data.json   # Sample usage input
├── tsconfig.json     # TypeScript configuration
└── package.json      # Dependencies and scripts
```

## 🛡️ Error Handling

The system is designed to be "resilient". If an entry in the JSON file is missing a required field or contains invalid data types (e.g., a string where a number should be), the application will:
1. Log a warning describing the issue.
2. Skip the invalid entry.
3. Continue processing the remaining valid entries.

---
*Developed as part of a technical coding challenge.*
