import React, { useMemo } from 'react'
import { ListRenderItemInfo } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useHomeStackNavigation } from 'src/app/navigation/types'
import VerifiedIcon from 'src/assets/icons/verified.svg'
import { Button } from 'src/components/buttons/Button'
import { Chevron } from 'src/components/icons/Chevron'
import { NFTViewer } from 'src/components/images/NFTViewer'
import { Flex } from 'src/components/layout'
import { Box } from 'src/components/layout/Box'
import { Text } from 'src/components/Text'
import { NFTAsset } from 'src/features/nfts/types'
import { ElementName } from 'src/features/telemetry/constants'
import { Screens } from 'src/screens/Screens'
import { dimensions } from 'src/styles/sizing'
import { theme } from 'src/styles/theme'

const NFT_COLLECTION_IMAGE_SIZE = dimensions.fullWidth / 3
interface Props {
  nftAssets: NFTAsset.Asset[]
  owner: string | undefined
}

export function NFTGroupByCollection({ nftAssets, owner }: Props) {
  const groupedNFTs = useMemo(() => {
    return Array.from(
      nftAssets
        .reduce((acc, item) => {
          const collectionAddress = item.asset_contract.address
          if (acc.has(collectionAddress)) {
            acc.get(collectionAddress)!.push(item)
          } else {
            acc.set(collectionAddress, [item])
          }
          return acc
        }, new Map<string, NFTAsset.Asset[]>())
        .values()
    ).sort((a, b) => a[0]?.collection?.name?.localeCompare(b[0]?.collection?.name ?? ''))
  }, [nftAssets])

  return (
    <Flex>
      {groupedNFTs.map((collection) => (
        <NFTCollectionItem
          key={collection[0].asset_contract.address}
          nftAssets={collection}
          owner={owner}
        />
      ))}
    </Flex>
  )
}

function NFTCollectionItem({ nftAssets, owner }: Props) {
  // confirm this works from external profiles too
  const navigation = useHomeStackNavigation()

  const renderItem = ({ item }: ListRenderItemInfo<NFTAsset.Asset>) => (
    <Button
      height={NFT_COLLECTION_IMAGE_SIZE}
      marginRight="xxxs"
      width={NFT_COLLECTION_IMAGE_SIZE}
      onPress={() =>
        navigation.navigate(Screens.NFTItem, {
          owner: owner || '',
          address: item.asset_contract.address,
          token_id: item.token_id,
        })
      }>
      <NFTViewer squareGridView uri={item.image_url} />
    </Button>
  )

  if (!nftAssets[0]) return null

  const { safelist_request_status, name, slug } = nftAssets[0].collection
  // address is the same for all assets in a collection so just take the address from the first one.
  const collectionAddress = nftAssets[0].asset_contract.address

  const isVerified = safelist_request_status === 'verified'

  return (
    <Flex
      backgroundColor="backgroundContainer"
      borderTopLeftRadius="lg"
      borderTopRightRadius="lg"
      gap="none">
      <Button
        name={ElementName.NFTCollectionItem}
        onPress={() =>
          navigation.navigate(Screens.NFTCollection, {
            collectionAddress: collectionAddress,
            slug,
            owner,
          })
        }>
        <Box borderBottomColor="backgroundContainer" borderWidth={0.5} flexDirection="column">
          <Flex row gap="sm" m="md">
            <Flex fill row alignItems="center" gap="xs">
              <Text color="textSecondary" numberOfLines={1} variant="bodySmall">
                {name}
              </Text>
              {isVerified && (
                <VerifiedIcon fill={theme.colors.accentActive} height={16} width={16} />
              )}
            </Flex>
            <Chevron color={theme.colors.textSecondary} direction="e" height={20} width={20} />
          </Flex>
        </Box>
      </Button>
      <FlatList
        horizontal
        data={nftAssets}
        keyExtractor={key}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </Flex>
  )
}

function key(nft: NFTAsset.Asset) {
  return nft.id.toString()
}
