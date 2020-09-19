<template>
    <div class="page" id="risk-home">

        <AssessmentList
            id="al"
            :info="pendingInfo"
            :assessmentIdList="pendingAssessments"
        />

        <AssessmentList
            id="al2"
            :info="completedInfo"
            :assessmentIdList="completedAssessments"
        />

        <AssessmentContainer id="AC"/>
    </div>
</template>

<script>
import AssessmentList from "./AssessmentList";
import AssessmentContainer from "./AssessmentContainer";
import {EVENTS} from "../../util/events";
import firebase from "firebase";


export default {
    name: "RiskHome",
    components: {
        AssessmentList,
        AssessmentContainer
    },

    mounted() {
        this.$root.$on(EVENTS.assessmentListSelectedEvent, data => {
            this.handleAssessmentSelected(data);
        });

    },

    created() {
        this.getAssessments();
    },

    data: () => ({

        // PENDING
        pendingInfo: {
            title: "Pending Assessments",
            subtitleWord: "Received",
            id: 0

        },
        pendingAssessments: [],

        // COMPLETED
        completedInfo: {
            title: "Submitted Assessments",
            subtitleWord: "Submitted",
            id: 1

        },
        completedAssessments: [],
    }),

    methods: {
        handleAssessmentSelected: function (data) {

            // Logic to unselect form from other AssessmentList component
            let listToClear = (data.source) === 1 ? 0 : 1;
            this.$root.$emit(EVENTS.clearSelectedAssessment, listToClear);
        },

        getAssessments: async function (){
            let userID = firebase.auth().currentUser.uid;

            let response = await fetch(`https://api.pyth.app:5000/pythapi/authorized/api/getUser?userId=${userID}`)
            let respData = await response.json();

            this.pendingAssessments = respData["pending_forms"];
            this.completedAssessments = respData["completed_forms"];
        },
    }
}
</script>

<style scoped>
    #risk-home {
        height: 100vh;
        width: 100%;

        display: grid;
        row-gap: 2rem;
        grid-template-areas:
                "AL  AC"
                "AL2 AC"
        ;
        overflow-y: hidden;
    }

    #al {
        grid-area: AL;
    }

    #al2 {
        grid-area: AL2;
    }

    #AC {
        grid-area: AC;
    }
</style>