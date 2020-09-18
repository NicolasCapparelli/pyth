<template>
    <div id="holder-profile">
        <span>Submitted Forms</span>
        <v-list id="assessmentList">
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
</template>

<script>
    export default {
        name: "HolderProfile",
        props: {
            policyHolder: Object
        },

        data: () => ({
            assessments: [
                "Lorem",
                "Ipsum",
                "Dolor"
            ]
        }),

        methods: {
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

    #assessmentList {
        width: 100%;
        border: 1px #C4C4C4 solid;
    }

    .assessmentSelector {
        width: 100%;
    }

</style>