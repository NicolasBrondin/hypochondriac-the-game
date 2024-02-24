<template>
  <div id="playground" :style="'background-image: url('+game.currentLevel?.backgroundImage+')'">
      <div class="gradient"></div>
      <div class="transition-overlay" :class="{'active': isOverlayDisplayed}">{{ game.currentLevel?.name }}</div>
      <Item :data="i" v-for="i in items" @interaction="interact" :game="game" :currentItem="dragging"/>
      <div class="hud">
        <Player :speech="playerSpeech" :game="game"/>
        <Inventory :data="playerInventory" :game="game" @selection="selectItem" :currentItem="dragging"/>
      </div>
      <img class="dragged" draggable="false" v-if="dragging" :game="game" :style="'top:'+dragging.y+'px;left:'+dragging.x+'px;'" :src="dragging.image" width="50"/>
  </div>
</template>

<script lang="ts">
import { Ref, computed, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import Item from './Item.vue';
import Player from './Player.vue';
import Inventory from './Inventory.vue';
import { GameController } from '../engine/GameController';
export default {
  components: {
    Item,
    Inventory,
    Player
},
  setup(){
    const items = computed(()=>game.value.currentLevel?.items);

    const playerInventory = computed(()=>game.value.player.inventory);
    const dragging = ref();

    const isOverlayDisplayed = ref(false);
    const game: Ref<GameController> = ref(new GameController(()=>{
      isOverlayDisplayed.value = true;
      setTimeout(()=>isOverlayDisplayed.value = false, 1000);
    }));
    const playerSpeech = computed(()=>game.value.player.text);

    onMounted(()=>{
          document.addEventListener("mouseup", drop);
          document.addEventListener("mousemove",moveDrag);
      });

      onBeforeUnmount(()=>{
        game.value.destroy();
      })

    function interact(item: any){
      game.value.interactWithItem(item);
    }


    function moveDrag(ev: MouseEvent){
      if(dragging.value){
          dragging.value.x = ev.x - (dragging.value.width / 2);
          dragging.value.y = ev.y - (dragging.value.width / 2);
      }
    }

    function drop(){
        dragging.value = null;
    }

    function selectItem(item: any){
      dragging.value = item;
    }

    return { game, items, playerInventory, interact, playerSpeech, dragging, moveDrag, drop, selectItem, isOverlayDisplayed };
  }
}
</script>

<style scoped>

#playground {
  position: relative;
  
  height: 100%; 
  padding-bottom: calc(16/9%);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.gradient {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background: linear-gradient(rgba(0,0,0,0.0) 50%, rgba(0,0,0,1.0));
}
.dragged {
    position: absolute;
    pointer-events: none;
}

img {
    
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;

}

.hud {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 150px;
  display: flex;
  padding: 10px;
  gap: 10px;
}

.hud>* {
  flex: 1;
}

.transition-overlay {
  position: absolute;
  pointer-events: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1F1F1F;
  color: white;
  font-size: 60px;
  z-index: 2;
  transition: all 0.5s linear;
  transition-delay: 0.5s;
}

.transition-overlay.active {
  opacity: 1.0;
  transition: none;
}



</style>
