<template lang="pug">
  div.data-field
    div.field-value.one-line
      template(v-if='data')
        span {{nbTokens}} Tokens
        span.usd-value (${{usdValue}})
</template>
<script>
import { mapGetters } from 'vuex'
import { round, locale } from '../filters/NumberFilters'
import { txValue } from '../filters/TokensFilters'
export default {
  name: 'tokens-balance',
  props: {
  },
  created () {
  },
  methods: {
    ...mapGetters([
      'getPrices',
      'getPage'
    ])
  },
  computed: {
    prices () {
      return this.getPrices()
    },
    page () {
      return this.getPage()('tokens')
    },
    delayed () {
      return this.page.delayed
    },
    data () {
      return (this.page) ? this.page.data : null
    },
    nbTokens () {
      return this.data.length
    },
    usdValue () {
      let usdValue = 0
      this.data.forEach(token => {
        usdValue += txValue(token.balance) * (this.prices[`${token.symbol.toLowerCase()}/usd`] ?? 0)
      })
      usdValue = locale(round(usdValue, 2))
      return usdValue
    }
  }
}
</script>
<style lang="stylus">
  @import '../lib/styl/vars.styl'
  div.one-line
    flex-flow: row nowrap
    width 100%
  .usd-value
    color: txt-color
    padding-left: 0.5em
</style>
