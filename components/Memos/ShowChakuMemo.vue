<template>
  <div>
    <v-row>
      <v-row>
        <!-- {{ cmemT }} -->
        <v-col cols="12" class="pa-0 mt-3">
          <v-row class="ml-2 mb-2" style="font-size:16px;font-weight:bold">
            <span>{{cmemT.created}}</span>
            <span class="ml-2">受信</span>
            <span class="ml-2">{{ init.tel_number }}</span>
            <span class="ml-2 mr-2">{{ init.dial }}</span>
            <span class="ml-2">{{ cmemT.tantou }}</span>
            <span class="ml-2">{{ cmemT.naiyou }}</span>
            <span class="ml-2">: {{ cmemT.tel_extension }}</span>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    cmem: {
      type: Object,
      default: function() {
        return {};
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
      cmemT: this.cmem,
      init: this.initial
    };
  }
};
</script>
