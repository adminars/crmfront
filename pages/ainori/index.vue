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
        <v-col cols="6" class="pa-0 mt-3">
          <span>{{item.created}}</span>
          <span style="font-weight:bold; font-size:16px">{{item.tel_number}}</span>
          <span>{{item.tel_dial}}</span>
        </v-col>
        <v-col>
          <v-btn @click="getAnken(item,key);showAnken = !showAnken">{{item.totalOppo}}案件</v-btn>
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
        <v-container v-if="isAnken == item.id && showAnken" class="mt-3 mr-3 ml-3 mb-3" flex>
          <v-row class="text-center">
            <v-col>
              <v-btn
                color="success"
                v-if="createFrom"
                @click="closeForm=!closeForm;createFrom=!createFrom; showFrom=!showFrom;showAnkenList=!showAnkenList"
              >作成</v-btn>
              <v-btn
                color="warning"
                v-if="closeForm"
                @click="closeForm=!closeForm;createFrom=!createFrom; showAnkenList=!showAnkenList;showFrom=!showFrom"
              >閉じる</v-btn>
            </v-col>
          </v-row>
          <v-container v-if="showFrom" class="grey lighten-5 align-center">
            <v-row class="mb-6" no-gutters>
              <v-col sm="5" md="6">
                <v-card class="pa-2" outlined tile>iotem</v-card>
              </v-col>
              <v-col sm="5" offset-sm="2" md="6" offset-md="0">
                <v-card class="pa-2" outlined tile>value</v-card>
              </v-col>
            </v-row>
            <v-row class="mb-6" no-gutters>
              <v-col sm="5" md="6">
                <v-card class="pa-2" outlined tile>iotem</v-card>
              </v-col>
              <v-col sm="5" offset-sm="2" md="6" offset-md="0">
                <v-card class="pa-2" outlined tile>value</v-card>
              </v-col>
            </v-row>
            <v-row class="mb-6" no-gutters>
              <v-col sm="5" md="6">
                <v-card class="pa-2" outlined tile>iotem</v-card>
              </v-col>
              <v-col sm="5" offset-sm="2" md="6" offset-md="0">
                <v-card class="pa-2" outlined tile>value</v-card>
              </v-col>
            </v-row>
            <v-row class="mb-6" no-gutters>
              <v-col sm="5" md="6">
                <v-card class="pa-2" outlined tile>iotem</v-card>
              </v-col>
              <v-col sm="5" offset-sm="2" md="6" offset-md="0">
                <v-card class="pa-2" outlined tile>value</v-card>
              </v-col>
            </v-row>
            <v-row class="mb-6" no-gutters>
              <v-col sm="5" md="6">
                <v-card class="pa-2" outlined tile>iotem</v-card>
              </v-col>
              <v-col sm="5" offset-sm="2" md="6" offset-md="0">
                <v-card class="pa-2" outlined tile>value</v-card>
              </v-col>
            </v-row>
          </v-container>

          <div>
            <v-row v-for="(opp) in oppo" :key="opp.id" class="ml-3" v-show="showAnkenList">
              <showAnken :opportunity="opp" :initial="item" />
            </v-row>
          </div>
        </v-container>
        <!-- this is partner-->

        <v-row v-if="isPartner == item.id && showPartner" class="mt-3 mr-3 ml-3 mb-3">
          <div>
            <v-row v-for="(pat) in phartner" :key="pat.id" class="ml-3">
              <showPartner :partner="pat" :initial="item" />
            </v-row>
          </div>
        </v-row>
        <!-- memos -->
        <v-row v-if="isMemo == item.id && showMemo" class="mt-3 mr-3 ml-3 mb-3">
          <div>
            <v-row v-for="(mem) in pmemos" :key="mem.id" class="ml-3">
              <showMemo :memo="mem" :initial="item" />
            </v-row>
          </div>
        </v-row>
        <v-row v-if="isCMemo == item.id && showCMemo" class="mt-3 mr-3 ml-3 mb-3">
          <div>
            <v-row v-for="(cmem) in cmemos" :key="cmem.id" class="ml-3">
              <ShowChakuMemo :cmem="cmem" :initial="item" />
            </v-row>
          </div>
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
      oppo: "ainori/anken",
      phartner: "partner/phartner",
      pmemos: "memos/pmemos",
      cmemos: "memos/cmemo"
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
      ]
    };
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
    }
  }
});
</script>
