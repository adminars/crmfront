<template>
  <v-layout>{{ oppo }}</v-layout>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  async fetch({ app, store, query, auth }) {
    console.log(this.tel);
    //var extr = store.getters.loggedInUser.user.loginext;
  },
  computed: {
    ...mapGetters({
      oppo: "ainori/anken"
    })
  },
  props: ["opportunity", "tel"],
  data() {
    return {
      anken: this.opportunity,
      phone: this.tel,
      name: "ame"
    };
  },
  created() {
    console.log("i am created");
  },
  updated() {
    console.log("i am uupdated");
  },

  methods: {
    setValue(value) {
      this.name = this.tel;
    }
  }
};
</script>
