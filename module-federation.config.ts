import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'mf-payment-provider',
  exposes: {
    '.': './src/components/ProviderComponent.tsx',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
