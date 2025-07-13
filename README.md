# Payment Provider Microfrontend

A Module Federation microfrontend that provides payment processing components and services for e-commerce applications.

## 🎯 Overview

The Payment Provider is a specialized microfrontend built with React, TypeScript, and Module Federation that exposes payment-related components for consumption by other applications.

## 📦 Exposed Components

### PaymentButton

A reusable payment button component with customizable amount, currency, and callback functionality.

```tsx
import PaymentButton from 'paymentProvider/PaymentButton';

<PaymentButton 
  amount={99.99}
  currency="USD"
  onPayment={(amount) => console.log(`Paid: $${amount}`)}
/>
```

**Props:**
- `amount` (number, required): Payment amount to be processed
- `currency` (string, optional, default: "USD"): Payment currency (ISO 4217 code)
- `onPayment` (function, optional): Callback function triggered when payment is processed

### PaymentComponent

Main payment provider component with Module Federation branding.

```tsx
import PaymentComponent from 'paymentProvider/PaymentComponent';

<PaymentComponent />
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Bun >= 1.0.0  
- React >= 18.0.0

### Installation

```bash
# Install dependencies
bun install
```

## Get Started

Start the dev server:

```bash
bun dev
```

Build the app for production:

```bash
bun build
```

Preview the production build locally:

```bash
bun preview
```

## 🔧 Module Federation Configuration

```typescript
{
  name: 'mfPaymentProvider',
  exposes: {
    './PaymentComponent': './src/components/ProviderComponent.tsx',
    './PaymentButton': './src/components/PaymentButton.tsx',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
  }
}
```

## 📋 API Endpoints

- **Manifest**: `http://localhost:3001/mf-manifest.json`
- **Remote Entry**: `http://localhost:3001/remoteEntry.js`
- **Health Check**: `http://localhost:3001/`

## 🔍 Metadata

The provider includes comprehensive metadata in `metadata.json` describing exposed modules, component properties, usage examples, and runtime information.
