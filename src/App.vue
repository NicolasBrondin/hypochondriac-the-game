<template>
  <Splashscreen/>
  <Menu v-if="gameState === 'menu'" @play="gameState='playing'"/>
  <Playground v-if="gameState === 'playing'" @finish="setState"/>
  <Credits v-if="gameState === 'won' || gameState === 'lost' " :gameState="gameState" />
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import Menu from './components/Menu.vue';
import Credits from './components/Credits.vue';
import Playground from './components/Playground.vue';
import Splashscreen from './components/Splashscreen.vue';

export default defineComponent({
  components: {
    Playground,
    Menu,
    Credits,
    Splashscreen
},
  setup(){
    const gameState = ref("menu");
    function setState(s: string){
      gameState.value = s;
    }
    return { gameState, setState };
  }
});
</script>

<style scoped>


</style>
