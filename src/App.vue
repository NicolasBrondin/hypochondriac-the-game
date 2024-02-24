<template>
  <Menu v-if="gameState === 'menu'" @play="gameState='playing'"/>
  <Playground v-if="gameState === 'playing'"/>
</template>

<script lang="ts">

import { ref } from 'vue';
import Menu from './components/Menu.vue';
import Playground from './components/Playground.vue';
export default {
  components: {
    Playground,
    Menu
},
  setup(){
    const gameState = ref("menu");
    return { gameState };
  }
}
</script>

<style scoped>


</style>
