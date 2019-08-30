<template>
  <div>
    <v-row justify="center" v-for="(part) in partner " :key="part.id">
      <v-col cols="8" class="pa-0 mt-3">
        <v-row class="ml-2 mb-2" style="font-size:16px;font-weight:bold">{{part.store_name}}</v-row>
        <v-row class="ml-2 mb-2">({{ part.phone1 }})</v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    partners: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      partner: this.partners
    };
  }
};
</script>
