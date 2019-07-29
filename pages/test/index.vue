<template>
  <v-layout column justify-center align-center>
    <v-flex>
      {{ countries }}
    </v-flex>
  </v-layout>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      countries: 'country/countries'
    })
  },
  async fetch({ app, store, query }) {
    return Promise.all([
      await store.dispatch('country/countryListAsync', {
        page: query.page || 1,
        ...query
      })
    ])
  }
}
</script>
