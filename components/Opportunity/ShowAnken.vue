<template>
  <div>
    <v-row v-for="(opp) in opps " :key="opp.id">
      <v-col cols="12" class="pa-0 mt-3">
        <v-row class="ml-2 mb-2" style="font-size:16px;font-weight:bold">
          <span>{{opp.id}}</span>
          <span class="ml-2">{{ opp.receipt_date }}</span>
          <span class="ml-2">{{ init.tel_dial }}</span>
          <span class="ml-2">{{ init.tel_number }}</span>
          <span class="ml-2">{{ opp.user_detail.familyname }}</span>
        </v-row>
        <v-row class="ml-2 mb-2">
          <span style="font-weight:bold">お客様 :</span>
          <span class="ml-2">{{ init.tel_number }}</span>
        </v-row>
        <v-row class="ml-2 mb-2">
          <span style="font-weight:bold">状態 :</span>
          <span class="ml-2">{{ opp.status_detail.name }}</span>
        </v-row>
        <v-row class="ml-2 mb-2">
          <span style="font-weight:bold">内容 :</span>
          <span class="ml-2">{{opp.trouble}}</span>
        </v-row>
        <v-row class="ml-2 mb-2">
          <span style="font-weight:bold">連絡事項 :</span>
          <span class="ml-2">{{opp.note}}</span>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    opportunity: {
      type: Array,
      default: function() {
        return [];
      }
    },
    initial: {
      type: Object,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      opps: this.opportunity,
      init: this.initial
    };
  }
};
</script>
