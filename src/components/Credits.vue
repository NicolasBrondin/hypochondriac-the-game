<template>
    <div class="credits" :class="gameState">
        <p>Crédits :</p>
        <p><br></p>
        <p>Réma</p>
        <p>Marine Drouin</p>
        <p>Nicolas Brondin-Bernard</p>
        <p>Copyrights : Yoyo Games</p>
        <audio autoplay loop>
            <source :src="gameState === 'lost' ? LostBackgroundMusic : WonBackgroundMusic"/>
        </audio>
        <i class="rain" v-if="gameState === 'lost'" v-for="r in new Array(150).fill(0)"></i>
    </div>

</template>

<script lang="ts">
import WonBackgroundMusic from '../assets/sound/won.mp3';
import LostBackgroundMusic from '../assets/sound/lost.mp3';

import { defineComponent } from 'vue';

export default defineComponent({
    props: ["gameState"],
    setup(props, { emit }){
        return { emit, WonBackgroundMusic, LostBackgroundMusic};
    }
})
</script>
<style>
.credits {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-size: cover;
    overflow: hidden;
}

@keyframes slide {
    0% { transform: translateY(400px)}
    100% { transform: translateY(-400px)}
}

.credits p {
    color: white;
    font-size: 30px;
    margin: 0;
    text-shadow: 0px 0px 5px black;
    animation: slide 20s linear 0s 1 forwards;
}

.credits.won {
    background-image:url(../assets/img/won.png);
}
.credits.lost {
    background-image:url(../assets/img/lost.png);
}

</style>