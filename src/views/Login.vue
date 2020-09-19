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
                    v-on:click="login"
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
            login: function () {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then(data => {
                        this.getUserData(data)
                    })
                    .catch(err => {
                        console.log(err.message);
                    });

            },

            getUserData: async function (data) {
                console.log(data.user.uid);
                let resp = await fetch(`https://api.pyth.app:5000/pythapi/authorized/api/getUser?userId=${data.user.uid}`)

                let respData = await resp.json();
                console.log(respData);
                this.routeUser(respData.userType.id)

            },

            register: function () {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.email, this.password)
                    .then(data => {
                        data.user
                            .updateProfile({
                                displayName: "0",
                            })
                            .then(() => {
                                console.log(data);
                            });
                    })
                    .catch(err => {
                        this.error = err.message;
                    });
            },

            routeUser(userType){
                let route;
                switch (userType) {
                    case 0:
                        console.log("Doctor");
                        route = "Dashboard";
                        break;
                    case 1:
                        console.log("Director");
                        route = "DashR";
                        break;
                    case 2:
                        console.log("Admin");
                        route = "DashH";
                        break;

                    default:
                        alert("Invalid User Type")
                        return;
                }
                this.$router.replace({ name: route });
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
        height: auto;
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
        flex: none !important;
    }

    #login-button {
        margin-top: 3rem;
        width: 80%;
        color: white;
        background-color: var(--main-color);
    }

</style>