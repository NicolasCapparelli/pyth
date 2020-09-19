<template>
    <div class="widget" id="holder-search">
        <div id="title-bar-container">
            <h2>{{title}}</h2>
            <div v-if="mode > 0" id="title-bar-actions">

                <v-btn icon color="#fa8072" v-on:click="backClicked">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>

                <v-btn icon color="#fa8072" v-on:click="homeClicked">
                    <v-icon>mdi-home</v-icon>
                </v-btn>
            </div>
        </div>

        <div v-if="mode <= 2" id="search-phase-container">
            <div id="search-container">
                <span>{{mode === 0 ? "Search by email" : "Search by name"}}</span>
                <v-text-field
                        :placeholder="mode === 0 ? 'example@email.com':'John Smith'"
                        outlined
                        id="search-bar"
                        v-model="persistedSearch"
                        v-on:input="updateSearchArray($event)"
                ></v-text-field>
            </div>

            <div id="institutions-container">
                <span>{{mode === 0 ? "Search by institution" : "Policy Holders"}}</span>

                <!-- Search by institution  -->
                <div v-if="mode === 0" class="institution-grid">
                    <div
                            class="institution-grid-item"
                            v-for="(institution, index) in institutions"
                            :key="index"
                            v-on:click="navigateTo(institution)"
                            v-ripple
                    >
                        <img class="institution-img" :src="institution.img_url" :alt="institution.name">
                    </div>
                </div>

                <!-- Search by name  -->
                <div v-else-if="mode === 1" class="institution-grid">
                    <div
                            class="policy-holder-grid-item"
                            v-for="(policyHolder, index) in policyHolders"
                            :key="index"
                            v-on:click="openHolderProfileFor(policyHolder)"
                            v-ripple
                    >
                        <v-avatar size="72">
                            <img class="policy-holder-image" :src="policyHolder.img_url" :alt="policyHolder.username">
                        </v-avatar>
                        <span class="policy-holder-name">{{policyHolder.username}}</span>

                    </div>
                </div>

                <!-- Search by email  -->
                <div v-else class="institution-grid">
                    <div
                            class="policy-holder-grid-item"
                            v-for="(policyHolder, index) in policyHolders"
                            :key="index"
                            v-on:click="openHolderProfileFor(policyHolder)"
                            v-ripple
                    >
                        <v-avatar size="72">
                            <img class="policy-holder-image" :src="policyHolder.img_url" :alt="policyHolder.username">
                        </v-avatar>
                        <span class="policy-holder-name">{{policyHolder.username}}</span>

                    </div>
                </div>
            </div>
        </div>
        <HolderProfile v-else :policy-holder="selectedPolicyHolder"/>
    </div>
</template>

<script>
import HolderProfile from "./sub-components/HolderProfile";

export default {
    name: "HolderSearch",
    components: {
        HolderProfile
    },
    mounted() {
        this.getInstitutions();
    },

    computed: {
        title: function () {
            switch (this.mode) {
                case 0:
                    return "Policy Holder Search";
                case 1:
                    return `${this.selectedInstitute} Search`;
                case 2:
                    return "Policy Holder Search";
                case 3:
                    return ` Profile | ${this.selectedPolicyHolder.name}`;
                default:
                    return "Policy Holder Search";
            }
        }
    },
    data: () => ({
        mode: 0,
        selectedInstitute: "",
        selectedPolicyHolder: {},

        institutions: [],
        policyHolders: [],

        persistedSearch: ""
    }),

    methods: {
        navigateTo: function (institution) {
            this.mode = 1;
            this.selectedInstitute = institution.name;
            this.getPolicyHoldersForInstitute(this.selectedInstitute);
        },

        backClicked: function () {
            this.mode -= 1;
            if (this.mode === 2) {
                this.updateSearchArray(this.persistedSearch);
            } else if (this.mode === 1) {
                this.mode = 0;
                this.persistedSearch = "";
            }
            this.policyHolders = [];
        },

        homeClicked: function () {
            this.mode = 0;
        },

        openHolderProfileFor: function (policyHolder) {
            this.selectedPolicyHolder = policyHolder;
            this.mode = 3;
        },

        // REQUESTS
        getInstitutions: async function (){
            let response = await fetch('https://api.pyth.app:5000/pythapi/authorized/api/getInstitutions')
            this.institutions = await response.json();
        },

        getPolicyHoldersForInstitute: async function(institute) {
            let response = await fetch(`https://api.pyth.app:5000/pythapi/authorized/api/getPolicyHoldersByCompany?company=${institute}`);
            this.policyHolders = await response.json();
        },

        updateSearchArray: async function (event) {
            this.persistedSearch = event;
            if (event.length < 1) {
                this.mode = 0;
                return;
            } else {
                this.mode = 2;
            }

            let response = await fetch(`https://api.pyth.app:5000/pythapi/authorized/api/searchPolicyHolders?search=${event}`);
            this.policyHolders = await response.json();
        }
    }

}
</script>

<style scoped>

    h2 {
        color: var(--risk-main);
    }

    span {
        color: var(--risk-main);
    }


    #holder-search {
        height: 100%;
        width: 700px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    #title-bar-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    #search-phase-container {
        width: 100%;
    }

    #search-container {
        width: 100%;
        margin-top: 1rem;
    }

    #institutions-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    .institution-grid {
        width: 100%;
        height: 100%;
        display: grid;
        margin-top: 1rem;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        column-gap: 1rem;
    }

    .institution-grid-item {
        height: 150px;
        width: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
    }

    .institution-img {
        width: 90%;
    }

    .policy-holder-grid-item {
        height: 150px;
        width: 150px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
    }

    .policy-holder-image {
        object-fit: cover;
        height: 100%;

    }

    .policy-holder-name {
        margin-top: 1rem;
        color: #595959;
    }

</style>