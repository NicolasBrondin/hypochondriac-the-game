<template>
    <div class="player" :class="{'panic': game?.player.emotion === 'panic'}">
        <div class="player-avatar"  :style="'background-image: url('+avatar+')'">
        </div>
        <div class="progress">
            <div class="progress-bar"></div>
        </div>
        {{ speech }}
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';
import { GameController } from '../engine/GameController';

export default defineComponent({
    props: {
        speech:{type: String},
        game: { type: Object as PropType<GameController> }
    },
    setup(props){
        const avatar = computed(()=>{
            return props.game?.player?.images[props.game?.player?.emotion];
        });
        return { avatar };
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
    top: -65px;
    width: 80px;
    height: 80px;
    /*border-radius: 40px;*/
    background-color: #F4E869;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
}

@keyframes flash {
    0% { background-color: #BF3131 }
    100% { background-color: #7D0A0A }
}
.player.panic .player-avatar {
    animation-name: flash;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    background-blend-mode:luminosity;
}

.progress {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 110px;
    background-color: #FAF2D3;
    height: 20px;
    width: 200px;
}
.progress-bar {
    min-width: 10%;
    width: 0px;
    height: 100%;
    background-color: #3085C3;
}

.player.panic .progress-bar {
    width: 100%;
    animation-name: flash;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    background-blend-mode:luminosity;
}
</style>