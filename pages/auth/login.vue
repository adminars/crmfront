<template>
  <v-container>
    <v-card class="ma-2 mx-auto" style="width:500px; aligh:center">
      <v-card-title>
        <div class="text-center">ログイン</div>
      </v-card-title>
      <hr />

      <v-card-text>
        <form>
          <div class="crm_error">{{ responseError }}</div>
          <v-text-field
            v-model="extention"
            v-validate="'required|max:4|integer'"
            :error-messages="errors.collect('extention')"
            label="端末番号"
            data-vv-name="extention"
            data-vv-as="端末番号"
          />
          <v-text-field
            v-model="username"
            v-validate="'required'"
            :error-messages="errors.collect('username')"
            label="ユーザー名"
            data-vv-name="username"
            data-vv-as="ユーザー名"
          />

          <v-text-field
            v-model="password"
            v-validate="'required'"
            :error-messages="errors.collect('password')"
            label="パスワード"
            type="password"
            data-vv-name="password"
            data-vv-as="パスワード"
          />

          <div class="text-center">
            <v-btn color="success" @click="login">ログイン</v-btn>
          </div>
          <!-- <v-btn @click="clear">クリア</v-btn> -->
        </form>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar.snackbar" :color="snackbar.color">
      <div style="color:white">{{ snackbar.text }}</div>
      <v-btn color="primary" @click="snackbar.snackbar = false">閉じる</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import _ from "lodash";
import nuxtend from "nuxtend";

export default nuxtend({
  data() {
    return {
      snackbar: {
        snackbar: false,
        text: "正しく入力して下さい",
        color: "error"
      },
      username: "",
      password: "",
      extention: "",
      return_data: {},
      responseError: ""
    };
  },

  methods: {
    login() {
      this.responseError = "";
      this.$validator.validateAll().then(success => {
        if (success) {
          window.localStorage.setItem("extention", this.extention);
          //sessionStorage.setItem("key", "value");

          this.$auth
            .loginWith("local", {
              data: {
                username: this.username,
                password: this.password,
                extension: this.extention
              }
            })
            .then(response => {
              console.log("loginSuccess");
              console.log(response);
              // this.$router.go(-1);
               this.$router.push('/')
             // this.$router.push(this.$i18n.path("/ainori"));
            })
            .catch(err => {
              if (
                !_.isEmpty(err) &&
                (err.response.status == 422 || err.response.status == 401)
              ) {
                window.localStorage.removeItem("extention");
                sessionStorage.setItem("key", "value");

                this.responseError = "please check you data"; //err.response.data.error;
              }
              // console.log("i came here");

              // console.log(err.response.status);
            });
          console.log(this.username);
          console.log(this.password);
          console.log(this.extention);
          console.log(window.localStorage);
        } else {
          this.snackbar.snackbar = true;
        }
      });
    }
  }
});
</script>
