<template>
<v-container grid-list-xl>
  <v-layout>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
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
      <v-toolbar-title v-text="title" />
      <v-flex xs9 offset-xs5 offset-md2 offset-lg5>
         <v-card-text>xs7 offset-(xs5 | md2 | lg5)</v-card-text>
        <!-- <v-toolbar-items
          v-show="!drawer"
          v-for="item in items"
          :key="item.text"
          class="hidden-sm-and-down px-0"
        >
          <v-btn text>{{ item.title }}</v-btn> -->
        </v-toolbar-items>
      </v-flex>
      <!-- <the-nav /> -->
      <v-spacer />
    </v-app-bar>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-layout>
</template>
<script>
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
      title: "クラピタル"
    };
  }
};
</script>
