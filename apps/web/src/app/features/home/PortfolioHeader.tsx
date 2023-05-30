import { SwitchNetworksModal } from 'src/app/features/home/SwitchNetworksModal'
import { Popover, XStack } from 'ui/src'
import GlobeIcon from 'ui/src/assets/icons/globe.svg'
import SettingsIcon from 'ui/src/assets/icons/settings.svg'
import { LinkButton } from 'ui/src/components/button/Button'
import { Flex } from 'ui/src/components/layout/Flex'
import { Text } from 'ui/src/components/text/Text'
import { Unicon } from 'ui/src/components/Unicon'
import { colors } from 'ui/src/theme/color'
import { iconSizes } from 'ui/src/theme/iconSizes'
import { sanitizeAddressText, shortenAddress } from 'wallet/src/utils/addresses'

type PortfolioHeaderProps = {
  address: Address
  onLockPress?: () => void
}

export function PortfolioHeader({ address }: PortfolioHeaderProps): JSX.Element {
  // TODO: Add dapp connection status to store to show/hide switch networks modal
  return (
    <XStack alignItems="center" justifyContent="space-between" padding="$spacing16">
      <Flex alignItems="center" flexDirection="row" gap="$spacing8" justifyContent="center">
        <Unicon address={address} size={iconSizes.icon36} />
        <Text variant="subheadSmall">{sanitizeAddressText(shortenAddress(address))}</Text>
      </Flex>
      <XStack alignItems="center" gap="$spacing16" justifyContent="space-around">
        <Popover>
          <Popover.Trigger>
            <GlobeIcon color={colors.gray200} height={iconSizes.icon24} width={iconSizes.icon24} />
          </Popover.Trigger>
          <Popover.Content borderRadius="$rounded12">
            <SwitchNetworksModal />
          </Popover.Content>
        </Popover>
        <LinkButton
          icon={
            <SettingsIcon
              color={colors.gray200}
              height={iconSizes.icon24}
              width={iconSizes.icon24}
            />
          }
          padding={0}
          to="/settings"
        />
      </XStack>
    </XStack>
  )
}
