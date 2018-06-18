import Home from '@/components/Home'
import DataPage from '@/components/DataPage'
import DataItem from '@/components/DataItem'
import { ROUTES as r } from '../config/types'
import config from '../config/config.json'
import tokens from './tokens'

const tokenTabRender = (data) => (data ? data.contractType === 'ERC20' : false)
const contractTabRender = (data) => (data ? data.type === 'contract' : false)

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: `/${r.accounts}`,
    redirect: `/${r.addresses}`

  },
  {
    path: `/${r.stats}`,
    name: 'stats',
    beforeEnter (t, f) {
      let url = config.statsUrl
      if (!url) {
        let host = window.location.host.split('.')
        host[0] = 'stats'
        url = window.location.protocol + '//' + host.join('.')
      }
      window.open(url, '_blank')
    }
  },
  {
    path: `/${r.blocks}`,
    name: 'Blocks',
    component: DataPage,
    props: {
      type: 'blocks',
      dataType: 'blocks',
      action: 'getBlocks',
      title: 'Blocks'
    }
  },
  {
    path: `/${r.block}/:number`,
    name: 'Block',
    component: DataPage,
    props: {
      type: 'blocks',
      dataType: 'block',
      action: 'getBlock',
      headComponent: DataItem,
      title: '',
      tabs: [
        {
          name: 'transactions',
          dataType: 'transactions',
          action: 'getTransactionsByBlock'
        }
      ]
    }
  },
  {
    path: `/${r.addresses}`,
    name: 'Addresses',
    component: DataPage,
    props: {
      type: 'blocks',
      dataType: 'addresses',
      action: 'getAddresses',
      title: 'Addresses'
    }
  },
  {
    path: `/${r.address}/:address`,
    name: 'Address',
    component: DataPage,
    props: {
      type: 'blocks',
      title: (parentData) => {
        const type = parentData.contractType
        if (type === 'ERC20') return 'token'
        return parentData.type || ''
      },
      headComponent: DataItem,
      dataType: 'address',
      action: 'getAddress',
      tabs: [
        {
          name: 'transactions',
          dataType: 'transactions',
          action: 'getTransactionsByAddress'
        },
        {
          name: 'events',
          dataType: 'events',
          action: 'getEventsByAddress',
          render: contractTabRender
        },
        {
          name: 'accounts',
          dataType: 'tokenAccounts',
          action: 'getTokenAccounts',
          render: tokenTabRender
        }
      ]

    }
  },
  {
    path: `/${r.transactions}`,
    name: 'Transactions',
    component: DataPage,
    props: {
      type: 'blocks',
      title: 'Transactions',
      dataType: 'transactions',
      action: 'getTransactions'
    }
  },
  {
    path: `/${r.transaction}/:hash`,
    name: 'Transaction',
    component: DataPage,
    props: {
      type: 'blocks',
      title: 'Transaction',
      dataType: 'transaction',
      action: 'getTransaction'
    }
  },
  ...tokens]
