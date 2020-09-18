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
                        label="I use chips"
                        multiple
                        chips
                        full-width
                        id="recipients"
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
                                <v-list-item-title>{{formType}}</v-list-item-title>
                                <v-list-item-subtitle></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-checkbox
                                        :input-value="active"
                                        color="#fa8072"
                                        v-model="selectedForms"
                                        :value="formType"
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
        data: () => ({
            formTypes: [
                "Lorem",
                "Ipsum",
                "Dolor"
            ],

            selectedForms: [],

            recipients: ['doctor@email.com', 'risk@email.com'],
            items: [
                'doctor@email.com',
                'risk@email.com',
                'director@email.com',
                'mcdonalds.spicynuggs@email.com',
            ],
        }),
        methods: {
            sendForms: function () {
                console.log("Sending Forms to", this.recipients);
            }
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

    #recipients {
        min-width: 100% !important;
    }

    #select-form-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    #formList {
        width: 100%;
        border: 1px #C4C4C4 solid;
    }

    .formSelector {
        width: 100%;
    }

    #send-forms {
        width: 100%;
        color: #FFFFFF;
    }
</style>