<template>
  <div>
    <v-row justify="center" v-for="(typetwo) in totalmemo " :key="typetwo.id">
      <v-col cols="8" class="ml-2 pl-3 pt-1 pa-0 ma-0">
        <v-row class="pa-0 ma-0">
          <span>{{ typetwo.created }}</span>
          <span class="pl-2">受信</span>
          <span class="pl-2">{{ typetwo.tel_number }}</span>
          <span class="pl-2">{{ typetwo.tel_dial }}</span>
          <span class="pl-2" style="font-size:16px;font-weight:bold">{{ typetwo.tantou }}</span>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8" class="ml-2 pl-3 pt-1 pa-0 ma-0"></v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: ["totalmemo"],
  data() {
    return {};
  }
};
</script>
