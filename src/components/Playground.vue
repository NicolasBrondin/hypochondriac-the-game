<template>
  <div id="playground" ref="playgroundContainer" :style="'background-image: url('+game.currentLevel?.backgroundImage+')'">
      <div class="gradient"></div>
      <!--<div class="transition-overlay" :class="{'active': isOverlayDisplayed}">{{ game.currentLevel?.name }}</div>-->
      <div class="item-overlay" @click="game.photoOverlayContent = null" v-if="game.photoOverlayContent">
        <img :src="game.photoOverlayContent"/>
      </div>
      <Item :data="i" v-for="i in items" @interaction="interact" :game="game" :currentItem="dragging" :container="playgroundContainer"/>
      <div class="hud">
        <Player :speech="playerSpeech" :game="game"/>
        <Inventory :data="playerInventory" :game="game" @selection="selectItem" :currentItem="dragging"/>
      </div>
      
  </div>
  <img class="dragged" draggable="false" v-if="dragging" :game="game" :style="'top:'+dragging.y+'px;left:'+dragging.x+'px;'" :src="dragging.icon" width="50"/>
</template>

<script lang="ts">
import { Ref, computed, onBeforeUnmount, onMounted, ref } from 'vue';
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
emits: ['finish'],
setup(props, {emit}){
    const items = computed(()=>game.value.currentLevel?.items);
    const playgroundContainer = ref();
    const playerInventory = computed(()=>game.value.player.inventory);
    const dragging = ref();

    const isOverlayDisplayed = ref(false);
    const game: Ref<GameController> = ref(new GameController((isFinished: boolean, newGameState?: string)=>{
      if(isFinished){
        emit('finish', newGameState)
      } else {
        isOverlayDisplayed.value = true;
        setTimeout(()=>isOverlayDisplayed.value = false, 1000);
      }
    }));
    const playerSpeech = computed(()=>game.value.player.text);

    onMounted(()=>{
          document.addEventListener("mouseup", drop);
          document.addEventListener("mousemove",moveDrag);
          window.addEventListener("resize", resize);
          resize();
      });

      onBeforeUnmount(()=>{
        game.value.destroy();
      })

    function resize(){
      game.value.refreshSize(playgroundContainer?.value.getBoundingClientRect().width, playgroundContainer?.value.getBoundingClientRect().height);
    };

    function interact(item: any){
      game.value.interactWithItem(item);
    }


    function moveDrag(ev: MouseEvent){
      if(dragging.value){
          dragging.value.x = ev.x - (50 / 2);
          dragging.value.y = ev.y - (50 / 2);
      }
    }

    function drop(){
        dragging.value = null;
    }

    function selectItem(item: any){
      dragging.value = item;
    }

    return { game, items, playerInventory, interact, playerSpeech, dragging, moveDrag, drop, selectItem, isOverlayDisplayed, playgroundContainer };
  }
}
</script>

<style scoped>

#playground {
  position: relative;
  height: 100%; 
  padding-bottom: calc(16/9%);
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background: linear-gradient(rgba(0,0,0,0.0) 50%, rgba(0,0,0,1.0));
  z-index:5;
}
.dragged {
    position: absolute;
    pointer-events: none;
    z-index: 999;
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
  z-index: 5;
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

.item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
  cursor: pointer;
}

.item-overlay img {
  height: 80%;
  border: 30px solid white;
  box-shadow: 0px 0px 20px 10px rgba(0,0,0,0.3);
  transform: rotate(0deg) scaleX(1.0);
  transition: all 0.5s ease-in;
}
.item-overlay img:hover {

  box-shadow: 10px 10px 30px 10px rgba(0,0,0,0.3);
  transform: rotate(3deg) scaleX(0.9);
  
}

</style>
