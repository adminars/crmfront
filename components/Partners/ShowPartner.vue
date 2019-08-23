<template>
  <div>
    <v-row>
      <v-row>
        <v-col cols="12" class="pa-0 mt-3">
          <v-row class="ml-2 mb-2" style="font-size:16px;font-weight:bold">
            <span>{{pat.store_name}}</span>
          </v-row>
          <v-row class="ml-2 mb-2">
            <span style="font-weight:bold">（電話 :</span>
            <span class="ml-2">{{ init.tel_number }})</span>
          </v-row>
          <!-- <showAnken :opportunity="oppo" :initial="item" /> -->
        </v-col>
        <!-- <br /> -->
        <!-- <row> -->
        <!-- <toggle-button @change="check" /> -->
        <!-- </row> -->
      </v-row>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    partner: {
      type: Object,
      default: function() {
        return {};
      }
    },
    initial: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      pat: this.partner,
      init: this.initial
    };
  }
};
</script>
