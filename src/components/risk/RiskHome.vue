<template>
    <div class="page" id="risk-home">
        <QuickSend/>
        <HolderSearch/>
    </div>
</template>

<script>
import QuickSend from "./QuickSend";
import HolderSearch from "./HolderSearch";

export default {
    name: "RiskHome",
    components: {
        QuickSend,
        HolderSearch
    }
}
</script>

<style scoped>
    #risk-home {
        height: 100%;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>