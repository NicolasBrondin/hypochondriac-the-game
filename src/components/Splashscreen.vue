<template>
    <div class="splash">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    setup(props, { emit }){
        return { };
    }
})
</script>
<style>
.splash {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-image:url(../assets/img/splash.jpg);
    background-size: cover;
    background-position: center;
    pointer-events: none;
    animation-name: fade;
    animation-delay: 2s;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    z-index: 10;
    opacity: 1.0;
    background-color: transparent;
    animation-iteration-count: 1;

}
@keyframes fade {
    0% { opacity: 1.0;}
    99% { opacity: 0.0;}
    100% { display: none;opacity: 0.0;}
}
</style>