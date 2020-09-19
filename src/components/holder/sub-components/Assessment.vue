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

let mockAssessment = {
    "formId": "2",
    "questions": [
        {
            "questionId": 4,
            "question": "Vital signs (temperature, blood pressure, heart rate, and respiratory rate) are obtained and documented in the medical record."
        },
        {
            "questionId": 23,
            "question": "I have input on whether a staff member is hired or fired at my place of work."
        },
        {
            "questionId": 28,
            "question": "A physician or advanced practice clinician reviews all test results, signs and dates the result. For electronic health records, a electronic signature and date stamp is created. "
        },
        {
            "questionId": 29,
            "question": "Treatment plans are consistent with working diagnosis and documented in the medical record."
        },
        {
            "questionId": 30,
            "question": "How often do you utilize \"cloning\", \"copying and pasting\" and/or \"pulling forward\" to document in the medical record ."
        },
        {
            "questionId": 42,
            "question": "My organization asks patients for feedback on their experience with an after visit survey."
        }
    ]
}

export default {
    name: "Assessment",
    components: {
        LikertQuestion
    },

    mounted() {
        this.$root.$on(EVENTS.likertAnswerSelected, data => {
            this.handleLikertAnswer(data);
        })
        this.answer = new Array(this.assessment.questions.length);
    },

    data: () => ({
        assessment: mockAssessment,
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
            console.log("Answer");
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