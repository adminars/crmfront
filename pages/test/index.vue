<template>
  <v-layout
    column
    justify-center
    align-center
  >
  <v-flex>
    {{ countries }}
  </v-flex>

  </v-layout>
</template>
<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import { mapGetters } from 'vuex'

export default {
   async fetch({ app, store, query }) {
    return Promise.all([
      await store.dispatch('country/countryListAsync', {
        page: query.page || 1,
        ...query
      }),
    ])
   },
    computed: {
    ...mapGetters({
      countries: 'country/countries',
    }),
    },
  components: {
    Logo,
    VuetifyLogo
  },
}
</script>
