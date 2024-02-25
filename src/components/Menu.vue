<template>
    <div class="menu">
        <p>Touch & Panic</p>
        <button @click="emit('play')">Jouer</button>
        <audio autoplay loop>
            <source src="../assets/sound/menu.mp3"/>
        </audio>
        <audio autoplay loop>
            <source src="../assets/sound/rain.mp3"/>
        </audio>
        <i class="rain" v-for="r in new Array(150).fill(0)"></i>
        <!--<div class="lightning"></div>-->
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    emits: ["play"],
    setup(props, { emit }){
        return { emit };
    }
})
</script>
<style>
.menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-image:url(../assets/img/menu.png);
    background-size: cover;
}
@keyframes breathe {
    0% { transform: scale(1.0);}
    100% { transform: scale(1.1);}
}
.menu p {
    font-size: 80px;
    line-height: 80px;
    margin: 0;
    color: white;
    margin-bottom: 40px;
    text-shadow: 0px 0px 10px black;
    animation: breathe infinite 3s ease-in-out;
    animation-direction: alternate;
}

@keyframes arrows {
    0%{ margin: 0px 5px; }
    100%{ margin: 0px 15px; }
}
.menu button {
    font-size: 40px;
    background: none;
    outline: none;
    border: none;
    color: white;
    cursor: pointer;
}
.menu button::before{
    content: ">";
}
.menu button::after{
    content: "<";
}
.menu button::before, .menu button::after{
    display: inline;
    animation-name: arrows;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-duration: 0.75s;
}

@keyframes light {
    0% { opacity: 0;}
    9% { opacity: 0;}
    10% { opacity: 0.5;}
    11% { opacity: 0;}
    50% { opacity: 0;}
    51% { opacity: 0.7;}
    52% { opacity: 0;}
    100% { opacity: 0;}
}

.lightning {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 2;
    pointer-events: none;
    opacity: 0;
    animation: light 3s linear 10s infinite;
}

</style>