<template>
  <div id="app">
    <v-app >
      <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
      <NavBar v-if="$route.fullPath !== '/registration' || $route.fullPath !== '/payment'"/>

      <v-content>
        <router-view :key="$route.fullPath"/>
      </v-content>
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

    methods: {
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

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
    padding: 16px
  }
</style>
