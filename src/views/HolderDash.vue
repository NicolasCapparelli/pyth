<template>
    <div class="dashboard" id="holder-dash">
        <div id="nav"></div>
        <HolderHome/>
    </div>
</template>

<script>
import HolderHome from "../components/holder/HolderHome";

export default {
    name: "HolderDash",
    components: {
        HolderHome
    }

}
</script>

<style scoped>
    #holder-dash {
        height: 100%;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    #nav {
        height: 100%;
        width: 100px;
        background-color: var(--policy-holder-main);

    }
</style>