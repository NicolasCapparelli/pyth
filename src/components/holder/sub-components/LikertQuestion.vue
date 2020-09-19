<template>
    <div class="likert-question">
        <span class="question-text">{{`${questionNum + 1}. ${question["question"]}`}}</span>
        <div class="boxes-container">
            <div class="box"
                 v-for="num in scale"
                 :key="num"
                 v-on:click="scaleClicked(num)"
                 :style="[(selected === num) ? {'background': 'var(--policy-holder-main)', 'color': '#FFFFFF'}
                 : {'background': '#FFFFFF', 'color': '#737373'}]"
            >
                {{num}}
            </div>
        </div>
        <div class="scale-container">
            <span class="scale-text">Unlikely</span>
            <span class="scale-text">Neither unlikely nor likely</span>
            <span class="scale-text">Likely</span>
        </div>
    </div>
</template>

<script>
import {EVENTS} from "../../../util/events";

export default {
    name: "LikertQuestion",
    props: {
        question: Object,
        questionNum: Number
    },
    data: () => ({
        selected: -1,
        scale: [1,2,3,4,5,6,7,8,9,10]
    }),

    methods: {
        scaleClicked: function (numSelected) {

            if (this.selected === numSelected) {
                this.selected = -1;
            } else {
                this.selected = numSelected
            }

            let data = {
                question: this.question,
                index: this.questionNum,
                answer: numSelected
            }

            this.$root.$emit(EVENTS.likertAnswerSelected, data);
        }
    }
}
</script>

<style scoped>

    .likert-question {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 16px 4px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
    .question-text {
        margin-bottom: 1rem;
        margin-right: auto;
        font-weight: bold;
    }

    .boxes-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
    }

    .box {
        height: 50px;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        cursor: pointer;
        -webkit-transition: background-color 100ms linear;
        -ms-transition: background-color 100ms linear;
        transition: background-color 100ms linear;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    }

    .scale-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .scale-text {
        font-size: 12px;
        text-align: left;
    }

</style>