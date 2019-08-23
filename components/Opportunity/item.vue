<template>
  <v-container>
    <!-- {{ form }} -->
    <v-row
      v-for="(item, key) in form"
      :key="item.id"
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
        <v-btn @click="emitGetAnken(item,key)">{{item.totalOppo}}案件</v-btn>
        <v-btn>{{ (!_.isNull(item.total_partners)) ? item.total_partners : '0' }} パトナー</v-btn>
        <v-btn>P候補</v-btn>
        <v-btn>
          {{ typeof item.totalchaku }}
          {{ (!_.isEmpty(item.totalchaku[0])) && (!_.isNull((item.totalchaku[0].itimemo))) ? item.totalchaku[0].itimemo: '0' }}
          一メモ
        </v-btn>
        <v-btn>
          {{ (!_.isEmpty(item.totalchaku[0])) && (!_.isNull((item.totalchaku[0].totalMemo))) ? item.totalchaku[0].totalMemo: '0' }}
          着信
        </v-btn>
      </v-col>
      <hr />
      <v-row>
        <div v-if="isClicked == item.id">{{oppo}}</div>
      </v-row>
      <!-- </v-row> -->
      <!-- <v-row>
        <div v-if="isClicked == item.id">i am salaman</div>
      </v-row>-->
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    item: {
      type: Array,
      default: function() {
        return [];
      }
    },
    anken: {
      type: Object,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      form: this.item,
      oppo: this.anken,
      shoname: false,
      isClicked: 0
    };
  },
  methods: {
    emitGetAnken(item, key) {
      this.isClicked = item.id;
      this.shoname = true;

      // showAnken =! showAnken
      // console.log(this.showAnken);
      // console.log(this.oppo);
      this.showAnken = true;
      this.opportunity = this.oppo;
      // if (this.showAnken == false) {
      // console.log("i am false");
      // this.opportunity = this.oppo;
      // }
      //this.showAnken == false ? true : false;
      console.log(item);
      this.$store
        .dispatch("ainori/asyncOpportunityByPhone", {
          phone: item.tel_number
        })
        .then(response => {
          console.log(response);
        });
      //console.log(item.tel_number);
    }
  }, // ...,
  computed: {} // ...
};
</script>
