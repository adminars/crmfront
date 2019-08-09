<template>
  <v-layout>
    <v-card class="mx-auto" max-width="400">
      <v-img
        class="white--text"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title class="align-end fill-height">Top 10 Australian beaches</v-card-title>
      </v-img>

      <v-card-text>
        <form>
          <v-text-field
            v-model="email"
            v-validate="'required|email'"
            :error-messages="errors.collect('email')"
            label="ユーザー名"
            data-vv-name="email"
            data-vv-as="メール"
          ></v-text-field>
          <v-text-field
            v-model="password"
            v-validate="'required|email'"
            :error-messages="errors.collect('email')"
            label="パスワード"
            type="password"
            data-vv-as="パース"
          ></v-text-field>
          <v-btn class="mr-4" @click="submit">ログイン</v-btn>
          <v-btn @click="clear">クリア</v-btn>
        </form>
      </v-card-text>

      <v-card-actions>
        <v-btn text color="orange">Share</v-btn>
        <v-btn text color="orange">Explore</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    email: "",
    password: ""
  }),

  methods: {
    submit() {
      this.$validator.validateAll().then(success => {});
    },
    clear() {
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = null;
      this.$validator.reset();
    }
  }
};
</script>
