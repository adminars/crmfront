<template id="list-item">
  <div>
    <v-row
      no-gutters
      justify="center"
      class="pa-0"
      style="line-height:1; border-spacing: -1em;padding: -0em; border-color:red;"
    >
      <v-col cols="4" class="pt-4 mt-4">
        <span>{{item.created}}</span>
        <span style="font-weight:bold; font-size:16px">{{item.tel_number}}</span>
        <span>{{item.tel_dial}}</span>
        <span>{{item.tel_number}}</span>
        <hr />
      </v-col>
      <v-col cols="4" class="pa-0 mt-3">
        <v-btn
          @click="getAnken(item)"
        >{{ (!_.isNull(item.opportunity)) ? (item.opportunity).length :0 }}案件</v-btn>
        <v-btn
          @click="getPartner"
        >{{ (!_.isNull(item.partners)) ? (item.partners).length : '0' }} パトナー</v-btn>
        <v-btn>P候補</v-btn>
        <v-btn @click="ShowTypeTwoMemoList">
          {{ (!_.isEmpty(item.TypeTwoMemoList)) && (!_.isNull((item.TypeTwoMemoList))) ? (item.TypeTwoMemoList).length: '0' }}
          一メモ
        </v-btn>
        <v-btn>
          {{ (!_.isEmpty(item.totalMemoList)) && (!_.isNull((item.totalMemoList))) ? (item.totalMemoList).length: '0' }}
          着信
        </v-btn>
        <hr />
      </v-col>
    </v-row>
    <!-- ths is anken releted div -->
    <div v-show="ankenButton" class="item-desc">
      <createanken
        :buttonValue="ankenButton"
        :callNumber="item.tel_number"
        :cfield="fildList"
        :cpartners="partners"
        :cdial="dials"
      />
      <div v-if="!_.isEmpty(item.opportunity)" class="item-desc">
        <showanken :buttonValue="ankenButton" :opportunity="item.opportunity" :initial="item"></showanken>
      </div>
      <div v-else color="primary">
        <v-row justify="center">
          <v-col cols="8">案件ありません</v-col>
        </v-row>
      </div>
    </div>

    <div v-show="partnerButton" class="item-desc">
      <div v-if="!_.isEmpty(item.partners)">
        <showpartner :partners="item.partners" :initial="item"></showpartner>
      </div>
      <div v-else color="primary">
        <v-row justify="center">
          <v-col cols="8">パトナーありません</v-col>
        </v-row>
      </div>
    </div>
    <div v-show="ShowTypeTwoMemo" class="item-desc">
      <div v-if="!_.isEmpty(item.TypeTwoMemoList)">
        <showtypetwo :MemoListTypeTwo="item.TypeTwoMemoList" :initial="item"></showtypetwo>
      </div>
      <div v-else color="primary">
        <v-row justify="center">
          <v-col cols="8">パトナーありません</v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
import showanken from "~/components/Opportunity/ShowAnken";
import showpartner from "~/components/Partners/partnerdetail";
import showtypetwo from "~/components/Memos/ShowTypeTwo";
import createanken from "~/components/Opportunity/create";

export default {
  components: {
    showanken,
    // anken,
    createanken,
    showpartner,
    showtypetwo
  },
  props: ["item", "gfields", "partnerlist", "dials"],
  data() {
    return {
      fildList: this.gfields,
      partners: this.partnerlist,
      ankenButton: false,
      partnerButton: false,
      itenAnken: 0,
      message: "",
      ShowTypeTwoMemo: false
    };
  },
  methods: {
    getAnken(item) {
      this.ankenButton = !this.ankenButton;
      if (this.ankenButton == true) {
        this.partnerButton = false;
        this.ShowTypeTwoMemo = false;
      }
    },
    getPartner(item) {
      this.partnerButton = !this.partnerButton;
      if (this.partnerButton == true) {
        this.ankenButton = false;
        this.ShowTypeTwoMemo = false;
      }
    },
    emitrabi(event) {
      this.$emit("click", "someValue");
    },
    finished() {
      this.message = "thisis rabi";
    },
    doso(data) {
      console.log(data);
    },
    ShowTypeTwoMemoList() {
      this.ShowTypeTwoMemo = !this.ShowTypeTwoMemo;
      if (this.ShowTypeTwoMemo == true) {
        this.ankenButton = false;
        this.partnerButton = false;
      }
    }
  }
};
</script>
