<template id="list-item">
  <div>
    <v-row
      no-gutters
      class="pa-0"
      style="line-height:1; border-spacing: -1em;padding: -0em; border-color:red;"
    >
      <v-col cols="6" class="pa-0 mt-3">
        <span>{{item.created}}</span>
        <span style="font-weight:bold; font-size:16px">{{item.tel_number}}</span>
        <span>{{item.tel_dial}}</span>
        <span>{{item.tel_number}}</span>
      </v-col>
      <v-col>
        <v-btn
          @click="getAnken(item)"
        >{{ (!_.isNull(item.opportunity)) ? (item.opportunity).length :0 }}案件</v-btn>
        <v-btn>{{ (!_.isNull(item.partners)) ? (item.partners).length : '0' }} パトナー</v-btn>
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
    </v-row>
    <hr />

    <div v-show="ankenButton" class="item-desc">
      <CreateAnken></CreateAnken>
      <div v-if="!_.isEmpty(item.opportunity)" class="item-desc">
        <showAnken :opportunity="item.opportunity" :initial="item"></showAnken>
      </div>
      <div v-else color="primary">案件ありません</div>
      <!-- {{ anken }} -->
      <!-- {{ anken }} -->
      <!-- <anken :opportunity="oppertunity" :tel="item.tel_number"></anken> -->
      <!-- <showAnken :opportunity="anken" :initial="item" /> -->
      <!-- {{anken}} -->
    </div>
    <div v-show="partnerButton" class="item-desc">i am anotehr</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ShowAnken from "~/components/Opportunity/ShowAnken";
import CreateAnken from "~/components/Opportunity/create";

import anken from "~/components/Opportunity/anken";

export default {
  computed: {
    ...mapGetters({
      oppertunity: "ainori/anken"
    })
  },
  components: {
    ShowAnken,
    anken,
    CreateAnken
  },
  props: ["item"],
  data() {
    return {
      ankenButton: false,
      partnerButton: false,
      itenAnken: 0,
      message: ""
    };
  },
  methods: {
    getAnken(item) {
      console.log(item);
      //  console.log(this.$refs.oppoTab);
      // this.itenAnken = item.id;

      this.ankenButton = !this.ankenButton;
      // anotherActive: false;
      if (this.ankenButton == true) {
        this.partnerButton = false;
      }
      /* console.log(item.tel_number);
      console.log("i am here");
      return this.$store
        .dispatch("ainori/asyncOpportunityByPhone", {
          phone: item.tel_number
        })
        .then(response => {
          console.log(response);
          //this.$store.commit("ainori/SET_ANKEN", response.data); // console.log("i am rabio");
        });
        */
    },
    getPartner(item) {
      //ankenButton: false;
      this.partnerButton = !this.partnerButton;
      if (this.partnerButton == true) {
        this.ankenButton = false;
      }
    },
    emitrabi(event) {
      //  console.log(this.$emit);
      //EventBus.$emit("update-item", this.todoItem);
      this.$emit("click", "someValue");
    },
    finished() {
      this.message = "thisis rabi";
    },
    thisis() {
      // this.message = "this si rabi neurpan";
      //console.log(this.$emit("ankenButton"));
    }
  }
};
</script>
