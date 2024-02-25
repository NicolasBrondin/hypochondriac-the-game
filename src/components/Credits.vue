<template>
    <div class="credits" :class="gameState">
        <p>Crédits :</p>
        <p></p>
        <p>Réma</p>
        <p>Marine Drouin</p>
        <p>Nicolas Brondin-Bernard</p>
        <p>Copyrights : Yoyo Games</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["gameState"],
    setup(props, { emit }){
        return { emit };
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