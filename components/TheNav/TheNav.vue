<template>
  <div>
    <div v-if="authorised">
      <div class="pt-3 pr-4">
        <p class="text-right">
          ようこそ！！{{ user.user.familyname }}さん
          <v-btn class="pl-3 pr-4" color="info" @click="logout">ログアウト</v-btn>
        </p>
      </div>
      <v-toolbar
        :extended="extended"
        :prominent="prominent"
        :dense="dense"
        :collapse="collapse"
        flat="flat"
        :src="bg ? 'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg' : undefined"
        :extension-height="extensionHeight"
      >
        <v-toolbar-title>CRM MANAGEMENT</v-toolbar-title>

        <div class="flex-grow-1"></div>
        <v-toolbar-items>
          <!-- authorised useer -->
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
            <!-- <v-list-item-action> -->
            <!-- <v-icon>{{ item.icon }}</v-icon> -->
            <!-- </v-list-item-action> -->
            <v-list-item-content>
              <v-list-item-title class="crmNavigationMenu" v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-toolbar-items>

        <!-- <v-toolbar-items v-for="(item, key) in items" :key="key" :to="item.to" router> -->
        <!-- <v-btn text>{{item.title}}</v-btn> -->
        <!-- <v-btn text>Link 2</v-btn> -->
        <!-- <v-btn text>Link 3</v-btn> -->
        <!-- </v-toolbar-items> -->
      </v-toolbar>
    </div>
    <div v-else>
      <v-toolbar
        :extended="extended"
        :prominent="prominent"
        :dense="dense"
        :collapse="collapse"
        flat="flat"
        :src="bg ? 'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg' : undefined"
        :extension-height="extensionHeight"
      >
        <v-toolbar-title>CRM MANAGEMENT</v-toolbar-title>

        <div class="flex-grow-1"></div>
        <v-toolbar-items>
          <!-- authorised useer -->
          <v-list-item v-for="(item, i) in guestItem" :key="i" :to="item.to" router exact>
            <!-- <v-list-item-action> -->
            <!-- <v-icon>{{ item.icon }}</v-icon> -->
            <!-- </v-list-item-action> -->
            <v-list-item-content>
              <v-list-item-title class="crmNavigationMenu" v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-toolbar-items>

        <!-- <v-toolbar-items v-for="(item, key) in items" :key="key" :to="item.to" router> -->
        <!-- <v-btn text>{{item.title}}</v-btn> -->
        <!-- <v-btn text>Link 2</v-btn> -->
        <!-- <v-btn text>Link 3</v-btn> -->
        <!-- </v-toolbar-items> -->
      </v-toolbar>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    extended: false,
    extendedSlot: false,
    prominent: false,
    dense: false,
    collapse: false,
    flat: false,
    bg: false,
    extensionHeight: 48,
    guestItem: [
      {
        icon: "mdi-chart-bubble",
        title: "ログイン",
        to: "/auth/login"
      },
      {
        icon: "mdi-chart-bubble",
        title: "ライン管理",
        to: "/partners"
      }
    ],
    items: [
      {
        icon: "mdi-chart-bubble",
        title: "ライン管理",
        to: "/partners"
      },
      {
        icon: "mdi-chart-bubble",
        title: "案件一覧",
        to: "/opportunity"
      },
      {
        icon: "mdi-chart-bubble",
        title: "アイノリ",
        to: "/ainori"
      }
      // {
      //   icon: "mdi-chart-bubble",
      //   title: "ログイン",
      //   to: "/auth/login"
      // }
    ]
  }),
  computed: {
    ...mapGetters({
      authorised: "isAuthenticated",
      user: "loggedInUser"
    })
  },
  methods: {
    check(){
      console.log("successfully logged out")
     // console.log( $nuxt.$route.path)
      this.$router.push('/partners')

    },
    async logout(){
      await this.$auth.logout()
      // this.showHideNoti()
      console.log("successfully logged out")
      this.$router.push('/partners')
     // this.$router.push($nuxt.route.path('/partners'))
    }
  },
};
</script>
