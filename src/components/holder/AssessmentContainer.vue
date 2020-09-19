<template>
    <div class="widget assessment-container"
         :style="[isEmpty? {'justify-content': 'center'} : {'justify-content': 'flex-start'}]"
    >
        <div v-if="isEmpty" id="empty-state-container">
            <v-icon id="empty-icon">mdi-selection-ellipse-arrow-inside</v-icon>
            <span>Select a form from Pending Assessments or Submitted Assessments to view it here</span>
        </div>

        <Assessment v-else/>
    </div>
</template>

<script>

import Assessment from "./sub-components/Assessment";
import {EVENTS} from "../../util/events";

export default {
    name: "AssessmentContainer",
    components: {
        Assessment
    },
    mounted() {
        this.$root.$on(EVENTS.assessmentListSelectedEvent, data => {
            this.handleSelectedAssessment(data)
        })

        this.$root.$on(EVENTS.closeAssessmentWidget, () => {
            this.isEmpty = true;
        })
    },
    data: () => ({
       isEmpty: true
    }),

    methods: {
        handleSelectedAssessment: function (data) {
            this.isEmpty = false;
            // TODO: API CALL WITH FORM ID
            console.log("tes");
            console.log(data);
        }
    }
}
</script>

<style scoped>
    #empty-icon {
        margin-bottom: 1rem;
    }

    .assessment-container {
        height: 100%;
        max-height: 100%;
        width: 700px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: hidden;
    }

    #empty-state-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-width: 70%;
        text-align: center;
    }
</style>