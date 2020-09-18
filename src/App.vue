<template>
  <div id="app">
    <v-app >
      <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
      <NavBar v-if="showNav"/>

      <v-main>
        <router-view :key="$route.fullPath"/>
      </v-main>
    </v-app>
  </div>
</template>

<script>
  import NavBar from './components/NavBar'

  export default {
    name: 'App',
    components: {
      NavBar
    },

    computed: {
      showNav: function () {
        return this.$route.fullPath !== '/login' && this.$route.fullPath !== '/dashr' && this.$route.fullPath !== '/dashh';
      }
    },

    methods: {
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  :root {
    --main-color: #1768AC;
    --dashboard-background: #FAFAFA;

    /* Persona Colors  */
    --risk-main: salmon;
    --policy-holder-main: #516db6;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -ms-overflow-style: none;
  }

  * ::-webkit-scrollbar {
    display: none;
  }

  body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.4;
  }

  #app {
    min-height: 100vh;
  }

  .page {
    padding: 32px;
  }

  .dashboard {
    background-color: var(--dashboard-background);
  }

  .widget {
    padding: 20px 32px;
    border-radius: 4px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
  }
</style>
