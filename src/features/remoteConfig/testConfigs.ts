type ConfigValue = 'disabled' | 'enabled'

/**
 * List of known test configs.
 *
 * To add a read-only remote test config, first create it
 * in the Firebase Console
 * @see {@link https://firebase.google.com/docs/ab-testing/abtest-config|Firebase AB Testing}
 *
 * then add the key and value here.
 *
 * The config will now be available through {@link isEnabled}.
 *
 * Local test configs can also be added to this list.
 */
export enum TestConfig {
  BiometricPrompt = 'Biometric Prompt (__DEV__)',
  RinkebyNFTs = 'rinkeby-nfts',
  ShowDevSettings = 'show_dev_settings',
}

export const TestConfigValues: Record<TestConfig, ConfigValue> = {
  [TestConfig.BiometricPrompt]: __DEV__ ? 'disabled' : 'enabled',
  [TestConfig.RinkebyNFTs]: 'disabled',
  [TestConfig.ShowDevSettings]: __DEV__ ? 'enabled' : 'disabled',
}
