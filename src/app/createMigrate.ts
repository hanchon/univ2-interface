// Adapted from https://github.com/rt2zz/redux-persist/blob/master/src/createMigrate.ts to addd more logging
import { DEFAULT_VERSION } from 'redux-persist/es/constants'

import type { MigrationManifest, PersistedState } from 'redux-persist'
import { logger } from 'src/utils/logger'

export default function createMigrate(
  migrations: MigrationManifest
): (state: PersistedState, currentVersion: number) => Promise<PersistedState> {
  return function (state: PersistedState, currentVersion: number): Promise<PersistedState> {
    try {
      if (!state) {
        logger.info('redux-persist', 'createMigrate', 'no inbound state, skipping migration')
        return Promise.resolve(undefined)
      }

      const inboundVersion: number = state._persist?.version ?? DEFAULT_VERSION

      if (inboundVersion === currentVersion) {
        logger.info(
          'redux-persist',
          'createMigrate',
          `versions match (${currentVersion}), noop migration`
        )
        return Promise.resolve(state)
      }

      if (inboundVersion > currentVersion) {
        logger.info('redux-persist', 'createMigrate', 'downgrading version is not supported')
        return Promise.resolve(state)
      }

      const migrationKeys = Object.keys(migrations)
        .map((ver) => parseInt(ver, 10))
        .filter((key) => currentVersion >= key && key > inboundVersion)
        .sort((a, b) => a - b)

      logger.info('redux-persist', 'createMigrate', `migrationKeys: ${migrationKeys}`)

      const migratedState: any = migrationKeys.reduce((versionState: any, versionKey) => {
        logger.info(
          'redux-persist',
          'createMigrate',
          `running migration for versionKey: ${versionKey}`
        )
        return migrations[versionKey](versionState)
      }, state)

      return Promise.resolve(migratedState)
    } catch (err) {
      logger.error('redux-persist', 'createMigrate', 'Error:', err)
      return Promise.reject(err)
    }
  }
}
