<template>
    <div class="dashboard" id="risk-dash">
        <div id="nav"></div>
        <RiskHome/>
    </div>
</template>

<script>

import RiskHome from "../components/risk/RiskHome";

export default {
    name: "RiskDash",
    components: {
        RiskHome
    }

}
</script>

<style scoped>
    #risk-dash {
        height: 100%;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    #nav {
        height: 100%;
        width: 100px;
        background-color: var(--risk-main);

    }
</style>