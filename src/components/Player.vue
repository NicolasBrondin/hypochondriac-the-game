<template>
    <div class="player" :class="{'panic': game?.player.emotion === 'panic'}">
        <div class="player-avatar"  :style="'background-image: url('+avatar+')'">
        </div>
        <div class="progress">
            <div class="progress-bar"></div>
        </div>
        {{ displaySpeech }}
    </div>
</template>

<script lang="ts">
import { ComputedRef, PropType, computed, defineComponent, onMounted, ref, watch } from 'vue';
import { GameController } from '../engine/GameController';

export default defineComponent({
    props: {
        speech:{type: String},
        game: { type: Object as PropType<GameController> }
    },
    setup(props){
        const speech = computed(()=>props.speech);
        const avatar: ComputedRef<string> = computed(()=>{
            //@ts-ignore
            return props.game?.player?.images[props.game?.player?.emotion];
        });
        let timer: any;
        const displaySpeech = ref("");
        onMounted(()=>{
            animateText();
        })
        watch([speech], animateText);
        function animateText(){

            if(timer){
                clearInterval(timer);
            }
            displaySpeech.value = "";
            timer = setInterval(()=>{
                displaySpeech.value = speech.value?.substring(0,displaySpeech.value.length + 1) ?? "";
            }, 25);
        }
        return { avatar, displaySpeech };
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
    color: #3085C3;
    margin-top: 40px;
}
.player.panic {

    animation-name: shake;
    animation-duration: 0.75s;
    animation-iteration-count: 4;
    animation-timing-function: linear;
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

@keyframes shake {
  0% { transform: rotate(0deg); }
  12.5% { transform: rotate(2deg); }
  25% { transform: rotate(0deg); }
  37.5% { transform: rotate(-2deg); }
  50% { transform: rotate(0deg); }
  62.6% { transform: rotate(2deg); }
  75% { transform: rotate(0deg); }
  87.5% { transform: rotate(-2deg); }
  100% { transform: rotate(0deg); }
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