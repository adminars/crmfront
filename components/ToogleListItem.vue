<template id="list-item">
  <div>
    <v-col cols="6" class="pa-0 mt-3">
      <span>{{item.created}}</span>
      <span style="font-weight:bold; font-size:16px">{{item.tel_number}}</span>
      <span>{{item.tel_dial}}</span>
      <span>{{item.tel_number}}</span>
      <v-btn @click="getAnken(item)">show</v-btn>
      <v-btn @click="getPartner(item)">show</v-btn>
    </v-col>
    <v-col>this</v-col>
    <hr />

    <div v-show="ankenButton" class="item-desc">{{item}}</div>
    <div v-show="partnerButton" class="item-desc">i am anotehr</div>
  </div>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      ankenButton: false,
      partnerButton: false,
      itenAnken: 0
    };
  },
  methods: {
    getAnken(item) {
      // this.itenAnken = item.id;
      this.ankenButton = !this.ankenButton;
      // anotherActive: false;
      if (this.ankenButton == true) {
        this.partnerButton = false;
      }
    },
    getPartner() {
      //ankenButton: false;
      this.partnerButton = !this.partnerButton;
      if (this.partnerButton == true) {
        this.ankenButton = false;
      }
    }
  }
};
</script>
