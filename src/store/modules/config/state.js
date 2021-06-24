import { EXPORT_FORMATS, EXPORT_ITEMS } from '../../../config/types'
export default function () {
  return {
    autoUpdateBlocks: false,
    sort: {},
    tables: {},
    exportFormat: EXPORT_FORMATS.JSON,
    exportItems: EXPORT_ITEMS.LIST,
    decimalPlaces: 2,
    q: {
      txs: {
        getTransactions: {
          txType: ['normal']
        }
      }
    }
  }
}
