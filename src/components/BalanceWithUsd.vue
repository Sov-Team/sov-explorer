<template lang="pug">
  div.data-field
    div.field-value.one-line
      span {{tokenBalance}} {{symbol}}
      span.usd-value (${{usdValue}})
</template>
<script>
import { mapGetters } from 'vuex'
import { round, locale, localeRound } from '../filters/NumberFilters'
import { txValue } from '../filters/TokensFilters'
export default {
  name: 'balance-with-usd',
  props: {
    field: Object,
    row: Object,
    data: String
  },
  created () {
  },
  methods: {
    ...mapGetters([
      'getPrices',
      'getDecimalPlaces'
    ])
  },
  computed: {
    symbol () {
      if (this.row?.symbol) return this.row.symbol
      if (this.row?.event === 'Transfer') return this.row.contract
      return 'RBTC'
    },
    isListDisplay () {
      return true && this.row
    },
    value () {
      if (this.row) return txValue(this.row[this.field.field])
      if (this.data) return txValue(this.data)
      return 0
    },
    prices () {
      return this.getPrices()
    },
    tokenBalance () {
      let tokenBalance = this.value
      if (this.isListDisplay) {
        tokenBalance = round(tokenBalance, this.getDecimalPlaces())
      }
      return tokenBalance
    },
    usdValue () {
      let usdValue = this.value * (this.prices[`${this.symbol.toLowerCase()}/usd`] ?? 0)
      if (this.isListDisplay) {
        usdValue = localeRound(usdValue)
      } else {
        usdValue = locale(round(usdValue, 2))
      }
      return usdValue
    }
  }
}
</script>
<style lang="stylus">
  @import '../lib/styl/vars.styl'
  div.one-line
    flex-flow: row nowrap
  .usd-value
    color: txt-color
    padding-left: 0.5em
</style>
