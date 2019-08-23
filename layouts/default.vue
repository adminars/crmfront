<template>
  <VApp>
    <template>
      <the-nav />
    </template>
    <v-container>
      <nuxt />
    </v-container>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </VApp>
</template>

<script>
// import TheNav from "~/components/TheNav/Navigation";
import TheNav from "~/components/TheNav/TheNav";

export default {
  components: {
    TheNav
  },
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
