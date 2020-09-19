<template>
    <div style="width: 100%; height: auto;">
        <v-app-bar id="toolbar" app hide-on-scroll elevation="2">
            <v-app-bar-nav-icon @click.stop="showNavigation = !showNavigation"></v-app-bar-nav-icon>
            <v-spacer></v-spacer><img src="../assets/logo.svg" width=100>
            <v-toolbar-title style="font-weight: bolder; text-align: start">Risk Assessment Platform</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>

        <!-- Drawer -->
        <v-navigation-drawer
                v-model="showNavigation"
                temporary
                fixed
        >
            <div id="header-container">
                <v-list-item-avatar style="margin: 0">
                    <img src="../assets/logo.svg" alt="Avatar">
                </v-list-item-avatar>
                <br>
                <h2>Pyth</h2>
                <h3>Risk Assessment v1.0</h3>
            </div>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-item
                        v-on:click="signClicked()"
                        link
                >
                    <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>Login</v-list-item-title>
                </v-list-item>
                <v-list-item
                        v-on:click="homeClicked()"
                        link
                >
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item>
            </v-list>

        </v-navigation-drawer>

    </div>
</template>


<script>

    export default {
        name: 'NavBar',

        props: {
        },

        components: {

        },

        data: () => ({
            showNavigation: false,
            abs: "absolute",
            rel: "relative"
        }),

        methods: {

            signClicked(){
                this.$router.push({name: "Login"});
            },

            homeClicked(){
                this.$router.push({name: "Home"});
            },

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #toolbar {

        width: 100%;
        height: 4rem;

        font-size: 22px;
        margin-bottom: 1rem;
    }

    .md-drawer {
        width: 300px;
        max-width: calc(100vw - 125px);
    }

    #header-container {
        height: auto;
        width: 100%;
        margin-bottom: 10px;
        padding: 40px 16px 0 16px;
    }

    #header-container h2 {
        margin-top: 20px;
    }

    #header-container h3 {
        margin-top: 5px;
    }

    .md-content {
        padding: 16px;
    }

    @media screen and (min-width: 750px) {
        #toolbar {
            padding: 0 20px;
        }

    }
</style>