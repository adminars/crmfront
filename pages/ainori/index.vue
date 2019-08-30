<template>
  <v-container>
    <div>
      <div v-for="(item,key) in lists" :key="key">
        <khokhoitem :item="item" :gfields="field" :dials="dial" :partnerlist="partners" />
        <!-- {{ item.tel_number }} -->
      </div>
    </div>
  </v-container>
</template>
<script>
import khokhoitem from "~/components/ToogleListItem";
import { mapGetters } from "vuex";

export default {
  async fetch({ app, store, query, auth }) {
    var extr = store.getters.loggedInUser.user.loginext;
    //console.log(store.getters.loggedInUser.user.loginext);
    return Promise.all([
      store.dispatch("fields/fieldsListAsync"),
      store.dispatch("dial/dialListAsync"),

      await store.dispatch("ainori/ainoriListAsync", {
        page: query.page || 1,
        extension: extr,
        ...query
      }),
      await store.dispatch("partner/asyncPartnerList", {})
    ]);
  },
  computed: {
    ...mapGetters({
      lists: "ainori/ainori",
      field: "fields/field",
      partners: "partner/partner",
      dial: "dial/dial"
    })
  },
  components: {
    khokhoitem
  },
  data() {
    return {
      items: [
        {
          text: "foo",
          desc: "foo desc"
        },
        {
          text: "bar",
          desc: "bar desc"
        },
        {
          text: "baz",
          desc: "baz desc"
        }
      ]
    };
  }
};
</script>
