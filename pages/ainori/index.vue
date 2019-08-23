<template>
  <v-container>
    <div>
      <v-row
        v-for="(item, key) in lists"
        :key="key"
        no-gutters
        class="pa-0"
        style="line-height:1; border-spacing: -1em;padding: -0em; border-color:red;"
      >
        <v-col cols="8" class="pa-0 mt-3">
          <span>{{item.created}}</span>
          <span style="font-weight:bold; font-size:16px">{{item.tel_number}}</span>
          <span>{{item.tel_dial}}</span>
        </v-col>
        <v-col>
          <v-btn @click="getAnken(item,key);showAnken = !showAnken">{{item.totalOppo}}案件</v-btn>
          <v-btn>{{ (!_.isNull(item.total_partners)) ? item.total_partners : '0' }} パトナー</v-btn>
          <v-btn>P候補</v-btn>
          <v-btn>
            {{ (!_.isEmpty(item.totalchaku[0])) && (!_.isNull((item.totalchaku[0].itimemo))) ? item.totalchaku[0].itimemo: '0' }}
            一メモ
          </v-btn>
          <v-btn>
            {{ (!_.isEmpty(item.totalchaku[0])) && (!_.isNull((item.totalchaku[0].totalMemo))) ? item.totalchaku[0].totalMemo: '0' }}
            着信
          </v-btn>
        </v-col>
        <hr />
        <!-- this si anken-->
        <v-row v-if="isAnken == item.id && showAnken" class="mt-3 mr-3 ml-3 mb-3">
          <div>
            <v-row v-for="(opp) in oppo" :key="opp.id" class="ml-3">
              <showAnken :opportunity="opp" :initial="item" />
            </v-row>
          </div>
        </v-row>
        <!-- this is partner-->
        <!--
        <v-row v-if="isAnken == item.id && showAnken" class="mt-3 mr-3 ml-3 mb-3">
          <div>
            <v-row v-for="(opp) in oppo" :key="opp.id" class="ml-3">
              <showAnken :opportunity="opp" :initial="item" />
            </v-row>
          </div>
        </v-row>
        -->
      </v-row>
    </div>
  </v-container>
</template>
<script>
import nuxtend from "nuxtend";
import { mapGetters } from "vuex";
import items from "~/components/Opportunity/item";
import ShowAnken from "~/components/Opportunity/ShowAnken";
//import { ToggleButton } from "vue-js-toggle-button";

export default nuxtend({
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
  computed: {
    ...mapGetters({
      lists: "ainori/ainori",
      oppo: "ainori/anken"
    })
  },
  components: {
    // ToggleButton,
    items,
    ShowAnken
  },
  data() {
    return {
      message: "message",
      session: {},
      //  showAnken: false,
      opportunity: {},
      isAnken: 0,
      showAnken: false,

      slideritems: [
        {
          showEdit: false
        },
        {
          showEdit: false
        }
      ]
    };
  },
  beforeMount() {
    //console.log(this);
  },
  methods: {
    getAnken(item) {
      this.isAnken = item.id;
      //  this.shoehidden = true;
      // showAnken =! showAnken
      // console.log(this.showAnken);
      //   console.log(this.oppo);
      //   this.showAnken = true;
      //   this.opportunity = this.oppo;
      //  if (this.showAnken == false) {
      //    console.log("i am false");
      //    this.opportunity = this.oppo;
      //  }
      //this.showAnken == false ? true : false;
      this.$store.dispatch("ainori/asyncOpportunityByPhone", {
        phone: item.tel_number
      });
      //console.log(item.tel_number);
    },
    check() {
      this.session = window.localStorage;
      localStorage.setItem("rabi", "neupane");
      console.log(window.localStorage);
      localStorage.removeItem("rabi");
      console.log(window.localStorage);
    },
    openEditor(slider) {
      slider.showEdit = true;
    },
    closeEditor(slider) {
      slider.showEdit = false;
    }
  }
});
</script>
