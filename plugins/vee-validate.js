//import Vue from 'vue';
//import VeeValidate from 'vee-validate';
//import ja from 'vee-validate/dist/locale/ja'

import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja'
// vee-validateの日本語
// Vue.use(VeeValidate, { locale: ja });
Vue.use(VeeValidate);
Validator.localize('ja', ja);