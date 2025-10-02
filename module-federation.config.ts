import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'mfPaymentProvider',
  filename: 'remoteEntry.js',
  exposes: {
    './ShoppingCart': './src/components/ShoppingCart.tsx',
    './CheckoutForm': './src/components/CheckoutForm.tsx',
    './PaymentButton': './src/components/PaymentButton.tsx',
    './types': './src/types/payment.ts',
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: '^18.0.0'
    },
    'react-dom': {
      singleton: true,
      requiredVersion: '^18.0.0'
    },
  },
  dts: false,
});
