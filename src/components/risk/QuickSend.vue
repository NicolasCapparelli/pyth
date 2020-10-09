<template>
    <div class="widget" id="quick-send">
        <div id="main-content">
            <h2>Quick Send</h2>
            <img id="send-illustration" src="@/assets/illustrations/send_illustration.svg" alt="send_illustration">
            <div id="receipt-container">
                <span>Recipients</span>
                <v-combobox
                        v-model="recipients"
                        :items="items"
                        label="Recipient Emails"
                        multiple
                        chips
                        full-width
                        class="RECIPE"
                        v-on:update:search-input="updateUserSearch($event)"
                        :search-input.sync="search"
                        @change="search = ''"
                        >
                ></v-combobox>
            </div>
            <div id="select-form-container">
                <span>Select Forms</span>
                <v-list id="formList">
                    <v-list-item
                            v-for="(formType, index) in formTypes"
                            :key="index"
                            class="formSelector"
                    >
                        <template v-slot:default="{ active }">
                            <v-list-item-content>
                                <v-list-item-title>{{formType.title}}</v-list-item-title>
                                <v-list-item-subtitle></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-checkbox
                                        :input-value="active"
                                        color="#fa8072"
                                        v-model="selectedForms"
                                        :value="formType.id"
                                ></v-checkbox>
                            </v-list-item-action>
                        </template>
                    </v-list-item>
                </v-list>
            </div>
        </div>
        <v-btn
            id="send-forms"
            color="#fa8072"
            v-on:click="sendForms"
        >
            Send Forms
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "QuickSend",
        mounted() {
            this.getForms();
        },
        data: () => ({
            formTypes: [],
            selectedForms: [],

            recipients: [],
            items: [],
        }),
        methods: {

            searchUsers: async function () {

            },

            updateUserSearch: async function (event) {
                let response = await fetch(`https://api.pyth.app:5000/pythapi/authorized/api/searchPolicyHolders?search=${event}`);
                let respData = await response.json();
                let userList = []
                for (let user of respData) {
                    userList.push(user.email);
                }
                this.items = userList;
            },

            getForms: async function () {
                let response = await fetch('https://api.pyth.app:5000/pythapi/unauthorized/api/getForms');
                this.formTypes = await response.json();
            },

            sendForms: async function () {
                let uidList = [];
                for (let recipientEmail of this.recipients) {
                    let uid = await this.getUidFromEmail(recipientEmail);
                    uidList.push(uid);
                }

                for (let user of uidList) {
                    for (let formId of this.selectedForms) {
                        await this.sendFormToUid(user, formId);
                    }
                }
            },

            getUidFromEmail: async function (email){
                let response = await fetch(`https://api.pyth.app:5000/pythapi/authorized/api/searchPolicyHolders?search=${email}`);
                let respData = await response.json();
                return respData[0];
            },

            sendFormToUid: async function (user, formId){
                console.log(user.uid, formId);
                let response = await fetch(`https://api.pyth.app:5000/pythapi/authorized/api/sendForm?userId=${user.uid}&formId=${formId}`, {
                    method: "POST"
                });
                console.log(response.status);
            },

        }
    }
</script>

<style scoped>

    h2 {
        color: var(--risk-main);
    }

    span {
        color: var(--risk-main);
    }

    #quick-send {
        height: 100%;
        width: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-right: 4rem;
    }

    #main-content {
        height: 90%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    #send-illustration {
        margin: 1rem auto auto auto;
        width: 50%;
    }

    #receipt-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    .RECIPE {
        min-width: 100% !important;
    }

    #select-form-container {
        height: 90%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        overflow: hidden;
    }

    #formList {
        height: 100%;
        width: 100%;
        border: 1px #C4C4C4 solid;
        overflow: scroll;

    }

    .formSelector {
        width: 100%;
    }

    #send-forms {
        width: 100%;
        color: #FFFFFF;
    }
</style>