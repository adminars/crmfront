<template>
  <div>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <div>this</div>

      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="crmNavigationMenu" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar
        :extended="extended"
        :prominent="prominent"
        :dense="dense"
        :collapse="collapse"
        :flat="flat"
        :extension-height="extensionHeight"
        dark
        color="primary"
        v-show="false"
      >
        <v-spacer></v-spacer>
        <v-btn>ログイン</v-btn>
        <v-btn>login</v-btn>
        <v-btn>login</v-btn>
        <v-btn>login</v-btn>
        <v-btn>login</v-btn>
      </v-toolbar>
    </v-app-bar>
    <v-toolbar
      :extended="extended"
      :prominent="prominent"
      :dense="dense"
      :collapse="collapse"
      :flat="flat"
      :src="bg ? 'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg' : undefined"
      :extension-height="extensionHeight"
    >
      <template v-if="extendedSlot" #extension>
        <v-toolbar-items>
          <v-btn text>Link 1</v-btn>
          <v-btn text>Link 2</v-btn>
          <v-btn text>Link 3</v-btn>
        </v-toolbar-items>
      </template>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text>Link 1</v-btn>
        <v-btn text>Link 2</v-btn>
        <v-btn text>Link 3</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div>{{ authorised }}</div>
    <div>{{ user }}</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-chart-bubble",
          title: "ログイン",
          to: "/auth/login"
        },
        {
          icon: "mdi-chart-bubble",
          title: "ライン管理",
          to: "/partners"
        },
        {
          icon: "mdi-chart-bubble",
          title: "案件一覧",
          to: "/opportunity"
        }

        // {
        //   icon: "mdi-chart-bubble",
        //   title: "アカウントチャットワーク管理",
        //   to: "/auth/register"
        // }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "クラピタル",
      extended: false,
      extendedSlot: false,
      prominent: false,
      dense: false,
      collapse: false,
      flat: false,
      bg: false,
      extensionHeight: 48
    };
  },
  computed: {
    ...mapGetters({
      authorised: "isAuthenticated",
      user: "loggedInUser"
    })
  }
};
</script>
