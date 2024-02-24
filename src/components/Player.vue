<template>
    <div class="player">
        <p>{{ speech }}</p>
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
    background: white;
}
</style>