<template>
    <div class="widget assessment-container"
         :style="[isEmpty? {'justify-content': 'center'} : {'justify-content': 'flex-start'}]"
    >
        <div id="empty-state-container">
            <v-icon id="empty-icon">mdi-selection-ellipse-arrow-inside</v-icon>
            <span>Select a form from Pending Assessments or Submitted Assessments to view it here</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AssessmentContainer",
        data: () => ({
           isEmpty: true
        }),
    }
</script>

<style scoped>
    #empty-icon {
        margin-bottom: 1rem;
    }

    .assessment-container {
        height: 100%;
        width: 700px;
        display: flex;
        flex-direction: column;
        align-items: center;
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