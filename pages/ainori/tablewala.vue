<template>
  <v-container>
    <!-- {{ partners }} -->
    <!-- {{ anken }} -->
    <div>
      <v-row
        v-for="(item, key) in lists"
        :key="key"
        no-gutters
        class="pa-0"
        style="line-height:1; border-spacing: -1em;padding: -0em; border-color:red;"
      >
        <v-col cols="6" class="pa-0 mt-3">
          <span>{{item.created}}</span>
          <span style="font-weight:bold; font-size:16px">{{item.tel_number}}</span>
          <span>{{item.tel_dial}}</span>
        </v-col>
        <v-col>
          <!-- <v-btn @click="getAnken(item,key)">{{item.totalOppo}}案件</v-btn> -->
          <v-btn @click="showAnkenDetail(item,key)">{{item.totalOppo}}表示</v-btn>
          <v-btn @click="hideAnkenDetail(item,key)">{{item.totalOppo}}非表示</v-btn>

          <!-- <v-btn @click="getAnken(item,key);showAnken = !showAnken">{{item.totalOppo}}案件</v-btn> -->
          <v-btn
            @click="getPartner(item);showPartner = !showPartner"
          >{{ (!_.isNull(item.total_partners)) ? item.total_partners : '0' }} パトナー</v-btn>
          <v-btn>P候補</v-btn>
          <v-btn @click="getMemo(item);showMemo = !showMemo">
            {{ (!_.isEmpty(item.totalchaku[0])) && (!_.isNull((item.totalchaku[0].itimemo))) ? item.totalchaku[0].itimemo: '0' }}
            一メモ
          </v-btn>
          <v-btn @click="getCMemo(item);showCMemo = !showCMemo">
            {{ (!_.isEmpty(item.totalchaku[0])) && (!_.isNull((item.totalchaku[0].totalMemo))) ? item.totalchaku[0].totalMemo: '0' }}
            着信
          </v-btn>
        </v-col>
        <hr />
        <!-- this si anken-->
        <v-container v-if="isAnken == item.id" class="mt-3 mr-3 ml-3 mb-3" flex>
          <div>
            <!-- <v-row v-for="(opp) in oppo" :key="opp.id" class="ml-3" v-show="showAnkenList"> -->
            <!-- </v-row> -->
          </div>
        </v-container>
        <!-- this is partner-->

        <v-row v-if="isPartner == item.id && showPartner" class="mt-3 mr-3 ml-3 mb-3"></v-row>
        <!-- memos -->
        <v-row v-if="isMemo == item.id && showMemo" class="mt-3 mr-3 ml-3 mb-3"></v-row>
        <v-row v-if="isCMemo == item.id && showCMemo" class="mt-3 mr-3 ml-3 mb-3">
          <!-- {{ cmemos }} -->
        </v-row>
        <!-- {{ cmemos }} -->
      </v-row>
    </div>
  </v-container>
</template>
<script>
import nuxtend from "nuxtend";
import { mapGetters } from "vuex";
import items from "~/components/Opportunity/item";
import ShowAnken from "~/components/Opportunity/ShowAnken";
import showPartner from "~/components/Partners/ShowPartner";
import showMemo from "~/components/Memos/ShowMemo";
import ShowChakuMemo from "~/components/Memos/ShowChakuMemo";

//import { ToggleButton } from "vue-js-toggle-button";

export default nuxtend({
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
      anken: "ainori/anken",
      phartner: "partner/phartner",
      pmemos: "memos/pmemos",
      cmemos: "memos/cmemo",
      field: "fields/field",
      partners: "partner/partner",
      dial: "dial/dial"
    })
  },
  components: {
    // ToggleButton,
    items,
    ShowAnken,
    showPartner,
    showMemo,
    ShowChakuMemo
  },
  data() {
    return {
      createAnken: {
        partner: ""
      },
      createMore: false,
      rabi: "",
      textArea: "かける番号:\nなまえ:\n住所:",
      createFrom: true,
      closeForm: false,
      showAnkenList: true,
      showFrom: false,
      isPartner: 0,
      isMemo: 0,
      isAnken: 0,
      isCMemo: 0,
      showCMemo: false,
      showAnken: false,
      showMemo: false,
      showPartner: false,
      message: "message",
      session: {},
      //  showAnken: false,
      opportunity: {},

      slideritems: [
        {
          showEdit: false
        },
        {
          showEdit: false
        }
      ],
      model: null,
      gender: [
        {
          id: 1,
          name: "male"
        },
        {
          id: 2,
          name: "female"
        }
      ],
      fieldsData: [
        { id: 1, name: "鍵", alias: "K" },
        { id: 2, name: "水まわり", alias: "W" },
        { id: 3, name: "ガラス", alias: "G" },
        { id: 4, name: "パソコン", alias: "P" },
        { id: 5, name: "電気工事", alias: "D" },
        { id: 6, name: "内装", alias: "R" },
        { id: 7, name: "ハウスクリーニング", alias: "H" },
        { id: 8, name: "害虫駆除", alias: "M" },
        { id: 9, name: "屋根", alias: "Y" },
        { id: 10, name: "庭", alias: "N" },
        { id: 11, name: "エアコン", alias: "A" },
        { id: 12, name: "リノベ", alias: "R" },
        { id: 13, name: "ペット葬儀", alias: "S" },
        { id: 14, name: "盗聴器発見", alias: "T" },
        { id: 15, name: "家電", alias: "X" }
      ],
      autoUpdate: true,
      friends: ["Sandra Adams", "Britta Holt"],
      isUpdating: false,
      name: "Midnight Crew",
      states: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Federated States of Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "ひらがな",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Island",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ],
      filters: [
        {
          value: 0,
          fn: (item, queryText, itemText) => item.indexOf(queryText) > -1,
          text: "Exact Match"
        },
        {
          value: 1,
          fn: (item, queryText, itemText) =>
            queryText.length > 2 && item.toLowerCase().indexOf(queryText) > -1,
          text: "Search Length > 2 & Loose Match"
        }
      ]
    };
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    }
  },
  beforeMount() {
    //console.log(this);
  },
  methods: {
    getAnken(item) {
      this.isAnken = item.id;
      this.isPartner = 0;
      this.isMemo = 0;
      this.isCMemo = 0;

      this.showPartner = false;
      this.showMemo = false;
      this.showCMemo = false;
      this.$store.dispatch("ainori/asyncOpportunityByPhone", {
        phone: item.tel_number
      });
    },
    getPartner(item) {
      this.isPartner = item.id;
      this.isMemo = 0;
      this.isAnken = 0;
      this.isCMemo = 0;

      this.showAnken = false;
      this.showMemo = false;
      this.showCMemo = false;

      this.$store.dispatch("partner/asyncPartnerByphone", {
        phone: item.tel_number //item.tel_number
      });
    },
    getMemo(item) {
      this.isMemo = item.id;
      this.isPartner = 0;
      this.isAnken = 0;
      this.isCMemo = 0;
      this.showAnken = false;
      this.showPartner = false;
      this.showCMemo = false;

      this.$store.dispatch("memos/asyncMemoByPhone", {
        phone: item.kensaku_tel1
        //memo_type: 2 //item.tel_number
      });
    },
    getCMemo(item) {
      this.isCMemo = item.id;
      this.isPartner = 0;
      this.isAnken = 0;
      this.isMemo = 0;
      this.showMemo = false;
      this.showAnken = false;
      this.showPartner = false;

      this.$store.dispatch("memos/asyncMemoByPhoneTypeTwo", {
        phone: item.kensaku_tel1
      });
    },
    openEditor(slider) {
      slider.showEdit = true;
    },
    closeEditor(slider) {
      slider.showEdit = false;
    },
    netnam() {
      this.textArea = this.textArea + "\ni am rabi";
    },
    cardKibo() {
      this.textArea = this.textArea + "\ni have card kibo";
    },
    bankKibo() {
      this.textArea = this.textArea + "\ni have bank kibo";
    },
    inspectionKibo() {
      this.textArea = this.textArea + "\ni have inspectionKibo kibo";
    },
    activeFilter() {
      if (this.model == null) return undefined;
      return this.filters[this.model].fn;
    },
    check() {
      alert("ntinging");
    },
    showAnkenDetail(item) {
      this.showAnken = true;
      this.isAnken = item.id;
    },
    hideAnkenDetail(item) {
      this.showAnken = false;
      this.isAnken = item.id;
    }
  }
});
</script>
