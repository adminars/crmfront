import colors from "vuetify/es5/util/colors";
import dotenv from "dotenv";
dotenv.config();
export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  router: {
    base: "/",
    middleware: ["auth"]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/style/app.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/lodash.js",
    "~/plugins/vee-validate.js",
    "~/plugins/axios.js"
    // "~plugins/vue-js-toggle-button"
    //"~/plugins/auth.js"
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "auth/login",
            method: "post",
            propertyName: "access_token"
          },
          user: { url: "auth/me", propertyName: "data", method: "get" },
          logout: { url: "/logout", method: "post" }
        }
      }
    },
    redirect: {
      login: "/auth/login",
      //home: "/"
      redirect: false,
      localStorage: false
    }
  },
  /*
   ** Nuxt.js dev-modules
   */
  devModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/moment",
    "@nuxtjs/auth"
    //  "@nuxtjs/proxy"
  ],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  /*proxy: {
    "/api": {
      target: "http://example.com",
      pathRewrite: {
        "^/api": "/"
      }
    }
  },
  */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  axios: {
    baseURL: process.env.API_URL,
    proxyHeaders: false,
    credentials: false
    // proxy: true
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
