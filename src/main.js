import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import * as firebase from "firebase";

Vue.config.productionTip = false

const configOptions = {
  apiKey: "AIzaSyDObc1mzmMXzzD-GNIkiK0hK47EGM4jpSg",
  authDomain: "pyth-ed5a0.firebaseapp.com",
  databaseURL: "https://pyth-ed5a0.firebaseio.com",
  projectId: "pyth-ed5a0",
  storageBucket: "pyth-ed5a0.appspot.com",
  messagingSenderId: "260627415033",
  appId: "1:260627415033:web:a22721bc8b941b132d0728"
};

firebase.initializeApp(configOptions);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
