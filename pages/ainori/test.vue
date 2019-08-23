<template>
  <items :item="lists" />
</template>
<script>
import items from "~/components/Opportunity/item";
import { mapGetters } from "vuex";

export default {
  asyncData({ app, store, query, auth }) {
    var extr = store.getters.loggedInUser.user.loginext;
    //console.log(store.getters.loggedInUser.user.loginext);
    return Promise.all([
      store.dispatch("ainori/ainoriListAsync", {
        page: query.page || 1,
        extension: extr,
        ...query
      })
    ]);
  },
  components: {
    items
  },
  computed: {
    ...mapGetters({
      lists: "ainori/ainori",
      oppo: "ainori/anken"
    })
  },
  data() {
    return {
      form: {
        name: "rabi neuane"
      },
      message: "thsi is teop "
    };
  },
  methods: {
    getAnken(evt) {
      console.log(" i am calling form abc");
    }
  }
};
</script>
