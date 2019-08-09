<template>
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
