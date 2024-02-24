<template>
    <div class="player">
        <div class="player-avatar">
        </div>
        {{ speech }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {speech:{type: String}},
    setup(props){

    }
});
</script>

<style scoped>
.player {
    position: relative;
    background: #FAF2D3;
    font-size: 22px;
    padding: 10px;
    padding-top: 20px;
    color: #5CD2E6;
    margin-top: 40px;
}
.player-avatar {
    position: absolute;
    left: 20px;
    top: -60px;
    width: 80px;
    height: 80px;
    /*border-radius: 40px;*/
    background-color: #F4E869;
}
</style>