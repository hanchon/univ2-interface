import { Trans } from '@lingui/macro'

import { ActivityTableContent } from './ActivityTableContent'
import { ListingsTableContent } from './ListingsTableContent'
import { OffersTableContent } from './OffersTableContent'
import { Tab, TabbedComponent } from './TabbedComponent'

const TableTabs: Array<Tab> = [
  {
    title: <Trans>Activity</Trans>,
    key: 'activity',
    content: <ActivityTableContent />,
  },
  {
    title: <Trans>Offers</Trans>,
    key: 'offers',
    content: <OffersTableContent />,
  },
  {
    title: <Trans>Listings</Trans>,
    key: 'listings',
    content: <ListingsTableContent />,
  },
]

export const DataPageTable = () => {
  return <TabbedComponent tabs={TableTabs} defaultTab={TableTabs[0]} noContentPadding={true} />
}
