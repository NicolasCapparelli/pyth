<template>
    <div id="holder-profile">

        <div id="pending-forms">
            <span>Submitted Forms</span>
            <v-list class="assessmentList">
                <v-list-item
                        v-for="(assessment, index) in assessments"
                        :key="index"
                        class="assessmentSelector"
                >
                    <template>
                        <v-list-item-icon>
                            <v-icon color="#fa8072">mdi-file</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{assessment}}</v-list-item-title>
                            <v-list-item-subtitle>Taken on 06/18/2020</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn icon color="#fa8072" v-on:click="sendReminderForAssessment">
                                <v-icon>mdi-reminder</v-icon>
                            </v-btn>
                        </v-list-item-action>

                        <v-list-item-action>
                            <v-btn icon color="#fa8072" v-on:click="viewAssessment">
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </template>
                </v-list-item>

            </v-list>
        </div>

        <div id="completed-forms">
            <span>Submitted Forms</span>
            <v-list class="assessmentList">
                <v-list-item
                        v-for="(assessment, index) in assessments"
                        :key="index"
                        class="assessmentSelector"
                >
                    <template>
                        <v-list-item-icon>
                            <v-icon color="#fa8072">mdi-file</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{assessment}}</v-list-item-title>
                            <v-list-item-subtitle>Taken on 06/18/2020</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn icon color="#fa8072" v-on:click="sendReminderForAssessment">
                                <v-icon>mdi-reminder</v-icon>
                            </v-btn>
                        </v-list-item-action>

                        <v-list-item-action>
                            <v-btn icon color="#fa8072" v-on:click="viewAssessment">
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </template>
                </v-list-item>

            </v-list>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HolderProfile",
        props: {
            policyHolder: Object
        },

        mounted() {
            this.getAssessments();
        },
        data: () => ({
            assessments: [
                "Lorem",
                "Ipsum",
                "Dolor"
            ]
        }),

        methods: {
            getAssessments: async function (){
                let response = await fetch(`https://api.pyth.app:5000/pythapi/authorized/api/getUser?userId=${this.policyHolder.uid}`)
                let respData = await response.json();
                console.log(respData);
            },

            sendReminderForAssessment: function() {
                console.log("reminder");
            },

            viewAssessment: function () {
                console.log("view");
            }
        }
    }
</script>

<style scoped>
    span {
        margin-bottom: 1rem;
        margin-right: auto;
        color: var(--risk-main);
    }

    #holder-profile {
        margin-top: 1rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }


    #pending-forms {
        width: 100%;
        margin-bottom: 4rem;
    }

    .assessmentList {
        width: 100%;
        border: 1px #C4C4C4 solid;
    }

    .assessmentSelector {
        width: 100%;
    }

    #completed-forms {
        width: 100%;
    }

</style>