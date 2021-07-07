<template lang="pug">
  div.data-field
    div.field-value.raw
      template(v-if='data')
        ul
          template(v-for='error in errors')
            li.error
              router-link(:to='`/${r.internalTx}/${error.internalTxId}`')
                icon(name='load')
                span {{error.error}}
</template>
<script>
import { mapGetters } from 'vuex'
import { ROUTES as r } from '../config/types'
export default {
  name: 'tx-errors',
  props: {
  },
  created () {
  },
  data () {
    return { r }
  },
  methods: {
    ...mapGetters([
      'getPage'
    ])
  },
  computed: {
    page () {
      return this.getPage()('internal transactions')
    },
    data () {
      return (this.page) ? this.page.data : []
    },
    errors () {
      return this.data.filter(internalTx => internalTx.error)
    }
  }
}
</script>
<style lang="stylus">
  @import '../lib/styl/vars.styl'
  li.error
    a, a:hover
      svg
        margin-right 4px
        path
          fill red !important
</style>
