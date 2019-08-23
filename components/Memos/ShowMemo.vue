<template>
  <div>
    <v-row>
      <v-row>
        <v-col cols="12" class="pa-0 mt-3">
          <v-row class="ml-2 mb-2" style="font-size:16px;font-weight:bold">
            <span>{{mem.created}}</span>
            <span class="ml-2">メモ</span>
            <span class="ml-2">{{ init.tel_number }}</span>
            <span class="ml-2 mr-2">{{ init.dial }}</span>
            <span class="ml-2">{{ mem.tantou }}</span>
            <span class="ml-2">{{ mem.naiyou }}</span>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    memo: {
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
      mem: this.memo,
      init: this.initial
    };
  }
};
</script>
