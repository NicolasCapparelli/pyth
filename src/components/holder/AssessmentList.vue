<template>
    <div class="widget assessment-list-container">
        <h2>{{info.title}}</h2>
        <v-list id="assessmentList" nav>
            <v-list-item-group v-model="selected" color="primary">
                <v-list-item
                        v-for="(assessment, index) in assessments"
                        v-on:click="assessmentClicked(assessment)"
                        :key="index"
                        class="assessmentSelector"
                >
                    <v-list-item-icon>
                        <v-icon color="#516db6">mdi-file</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{assessment.title}}</v-list-item-title>
                        <v-list-item-subtitle>{{`${info.subtitleWord} on 06/18/2020`}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script>
import {EVENTS} from "../../util/events";

export default {
    name: "AssessmentList",
    props: {
        info: Object,
        assessmentIdList: Array
    },

    mounted() {
        this.$root.$on(EVENTS.clearSelectedAssessment, data => {
            this.handleClearEvent(data);
        })

    },

    data: () => ({
        selected: -1,
        assessments: []
    }),

    watch: {
        // whenever assessmentIdList changes, this function will run
        assessmentIdList: function () {
            console.log("CHANGED!!!!!!!!!!!");
            if (this.assessmentIdList.length > 1) {
                this.tradeAssessmentIds(this.assessmentIdList);
            }
        }
    },

    methods: {
        tradeAssessmentIds: async function (list) {
            if (this.assessmentIdList.length < 1) {
                console.log("TRADE CANCELED");
                console.log("-----------");
                return;
            }

            console.log("BEFORE TRADE");

            let realAssessments = [];
            for (let formId of list) {
                let response = await fetch(`https://api.pyth.app:5000/pythapi/unauthorized/api/getFormQuestions?formId=${formId}`)
                let respData = await response.json();
                realAssessments.push(respData);
            }

            this.assessments = realAssessments;
            console.log("AFTER TRADE");
            console.log(this.assessments);
            console.log("-----------");
            this.$forceUpdate();
        },

        handleClearEvent: function (data){
            if (data === this.info.id) {
                this.selected = -1;
            }
        },

        assessmentClicked: function (clickedAssessment) {
            let data = {
                source: this.info.id,
                assessment: clickedAssessment,
                selected: this.selected

            }
            this.$root.$emit(EVENTS.assessmentListSelectedEvent, data);
        }
    }
}
</script>

<style scoped>
    h2 {
        color: var(--policy-holder-main);
        margin-bottom: 1rem;
    }

    .assessment-list-container {
        height: 100%;
        width: 500px;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    #assessmentList {
        width: 100%;
        border: 1px #C4C4C4 solid;
        border-radius: 2px;
    }

    .assessmentSelector {
        width: 100%;
    }
</style>