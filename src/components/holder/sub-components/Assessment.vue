<template>
    <div id="assessment-container">
        <h2>Assessment Name</h2>
        <LikertQuestion :question="sampleQuestion"/>
        <LikertQuestion :question="sampleQuestionTwo"/>
    </div>
</template>

<script>
import LikertQuestion from "./LikertQuestion";

export default {
    name: "Assessment",
    components: {
        LikertQuestion
    },

    data: () => ({
        sampleQuestion: {
            question: "1. Sit amet dolor sum storot?"
        },

        sampleQuestionTwo: {
            question: "2. Sed ut perspiciatis unde omnis iste natus?"
        },

    }),
}
</script>

<style scoped>

    h2 {
        color: var(--policy-holder-main);
        margin-right: auto;
        margin-bottom: 1rem;
    }

    #assessment-container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
</style>