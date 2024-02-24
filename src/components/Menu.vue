<template>
    <div class="menu">
        <p>Touch & Panic</p>
        <button @click="emit('play')">Jouer</button>
        <audio autoplay>
            <source src="../assets/sound/level-1.mp3"/>
        </audio>
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
    100% { transform: scale(1.2);}
}
.menu p {
    font-size: 80px;
    line-height: 80px;
    margin: 0;
    color: white;
    margin-bottom: 40px;
    text-shadow: 0px 0px 10px black;
    animation: breathe infinite 1s ease-in-out;
    animation-direction: alternate;
}

@keyframes arrows {
    0%{ margin: 0px 0px; }
    100%{ margin: 0px 10px; }
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
    animation-duration: 1s;
}
</style>