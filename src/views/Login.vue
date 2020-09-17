<template>
    <div class="page" id="login-page">
        <div id="login-box">
            <img id="logo" src="@/assets/logo/logo.png" alt="PythLogo">
            <v-text-field
                    class="login-input"
                    label="Email"
                    placeholder="email"
                    v-model="email"
            ></v-text-field>

            <v-text-field
                    class="login-input"
                    label="Password"
                    placeholder="password"
                    v-model="password"
                    type="password"
            ></v-text-field>

            <v-btn
                    v-on:click="submit"
                    id="login-button">Login</v-btn>
        </div>
    </div>
</template>

<script>
    import firebase from "firebase";

    export default {
        name: "Login",

        data: () => ({
            email: "",
            password: ""
        }),

        methods: {
            submit: function () {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then(data => {
                        console.log(data);
                        this.$router.replace({ name: "Dashboard" });
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            }
        }
    }
</script>

<style scoped>
    #login-page {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #login-box {
        height: 400px;
        width: 400px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        padding: 16px;
        border-radius: 10px;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
    }

    #logo {
        height: auto;
        width: 50%;
        margin-bottom: 1rem;
    }

    .login-input {
        margin-top: 0.2rem;
        width: 100%;
    }

    #login-button {
        width: 80%;
        color: white;
        background-color: var(--main-color);
    }

</style>