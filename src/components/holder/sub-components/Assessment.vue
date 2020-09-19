<template>
    <div id="assessment-container">

        <div id="header-container">
            <h2>Assessment Name</h2>
            <v-btn icon color="#516db6" v-on:click="closeAssessment">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </div>

        <div id="questions-container">
            <LikertQuestion
                    v-for="(question, index) in assessment.questions"
                    :key="index"
                    :question="question"
                    :question-num="index"
            />
            <v-btn v-on:click="submitAssessment" id="submit-assessment" color="#516db6">Submit</v-btn>
        </div>

    </div>
</template>

<script>
import LikertQuestion from "./LikertQuestion";
import {EVENTS} from "../../../util/events";

export default {
    name: "Assessment",
    components: {
        LikertQuestion
    },

    mounted() {
        this.$root.$on(EVENTS.assessmentListSelectedEvent, data => {
            this.assessment = data.assessment;
            this.answer = new Array(this.assessment.questions.length);
        })

        this.$root.$on(EVENTS.likertAnswerSelected, data => {
            this.handleLikertAnswer(data);
        })
    },

    data: () => ({
        assessment: {},
        answer: {}
    }),

    methods: {
        closeAssessment: function () {
            this.$root.$emit(EVENTS.clearSelectedAssessment, 0);
            this.$root.$emit(EVENTS.clearSelectedAssessment, 1);
            this.$root.$emit(EVENTS.closeAssessmentWidget);
        },

        /**
         * Data contents:
         * question: Object
         * index: Number
         * answer: Number
         */
        handleLikertAnswer: function (data) {
            this.answer[data.index] = {
                answer: data.answer,
                questionId: data.question.questionId
            }
        },

        submitAssessment: function() {
            console.log("Answers");
            console.log(this.answer);
        }

    }
}
</script>

<style scoped>

    #header-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
    }

    h2 {
        color: var(--policy-holder-main);
        margin-right: auto;
        margin-bottom: 0;
    }

    #assessment-container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        overflow-y: hidden;
        padding: 0 2px;
    }

    #questions-container {
        width: 100%;
        height: 100%;
        overflow: scroll;
    }

    #submit-assessment {
        margin-top: 3rem;
        width: 100%;
        color: #FFFFFF;
    }
</style>