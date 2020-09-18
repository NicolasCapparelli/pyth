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

        <div v-if="mode <= 1" id="search-phase-container">
            <div id="search-container">
                <span>{{mode === 0 ? "Search by email" : "Search by name"}}</span>
                <v-text-field
                        :placeholder="mode === 0 ? 'example@email.com':'John Smith'"
                        outlined
                        id="search-bar"
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
                        <img class="institution-img" :src="institution.img" :alt="institution.name">
                    </div>
                </div>

                <!-- Search by name  -->
                <div v-else class="institution-grid">
                    <div
                            class="policy-holder-grid-item"
                            v-for="(policyHolder, index) in policyHolders"
                            :key="index"
                            v-on:click="openHolderProfileFor(policyHolder)"
                            v-ripple
                    >
                        <v-avatar size="72">
                            <img class="policy-holder-image" :src="policyHolder.img" :alt="policyHolder.name">
                        </v-avatar>
                        <span class="policy-holder-name">{{policyHolder.name}}</span>

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

    computed: {
        title: function () {
            switch (this.mode) {
                case 0:
                    return "Policy Holder Search";
                case 1:
                    return `${this.selectedInstitute} Search`;
                case 2:
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

        institutions: [
            {
                name: "WellStar",
                img: "/assets/institutions/wellstar.png"
            },

            {
                name: "Emory",
                img: "/assets/institutions/emory.png"
            },

            {
                name: "St Joseph",
                img: "/assets/institutions/joseph.png"
            }
        ],

        policyHolders: [
            {
                name: "Marcus Smith",
                img: "https://thedisneyblog.com/wp-content/uploads/2019/05/jemaine-clement-avatar-headshot.jpg"
            },

            {
                name: "John Leider",
                img: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            },

            {
                name: "Jaylen John",
                img: "https://cdn.vuetifyjs.com/images/john.jpg"
            },
        ]
    }),

    methods: {
        navigateTo: function (institution) {
            this.mode = 1;
            this.selectedInstitute = institution.name;
            console.log(institution);
        },

        backClicked: function () {
            this.mode -= 1;
        },

        homeClicked: function () {
            this.mode = 0;
        },

        openHolderProfileFor: function (policyHolder) {
            this.selectedPolicyHolder = policyHolder;
            this.mode = 2;
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
    }

    .policy-holder-name {
        margin-top: 1rem;
        color: #595959;
    }

</style>