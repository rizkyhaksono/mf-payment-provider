import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'mfPaymentProvider',
  filename: 'remoteEntry.js',
  exposes: {
    './PaymentComponent': './src/components/ProviderComponent.tsx',
    './PaymentButton': './src/components/PaymentButton.tsx',
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
