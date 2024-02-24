<template>
    <Item :data="i" v-for="i in items" @interaction="takeObject" :game="game" :currentItem="dragging"/>
    <div class="hud">
      <Player :speech="playerSpeech" :game="game"/>
      <Inventory :data="playerInventory" :game="game" @selection="selectItem" :currentItem="dragging"/>
    </div>
    <img class="dragged" draggable="false" v-if="dragging" :game="game" :style="'top:'+dragging.y+'px;left:'+dragging.x+'px;'" :src="dragging.image" width="50"/>
</template>

<script lang="ts">
import { Ref, computed, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import Item from './components/Item.vue';
import Player from './components/Player.vue';
import LampSprite from './assets/img/items/lamp.png';
import Inventory from './components/Inventory.vue';
import { GameController } from './engine/GameController';
export default {
  components: {
    Item,
    Inventory,
    Player
},
  setup(){
    const items = ref([{
      id:"lamp",
      image: LampSprite,
      x: "650",
      y: "220",
      width: "50",
      height: "50"
    },{
      id:"lamp2",
      image: LampSprite,
      x: "250",
      y: "220",
      width: "50",
      height: "50"
    }]);

    const playerInventory = ref([]);
    const dragging = ref();
    const game: Ref<GameController> = ref(new GameController(this));
    const playerSpeech = computed(()=>game.value.player.text);

    onMounted(()=>{
          document.addEventListener("mouseup", drop);
          document.addEventListener("mousemove",moveDrag);
      });

      onBeforeUnmount(()=>{
        game.value.destroy();
      })

    function takeObject(item: any){
      playerInventory.value.push(item);
      const index = items.value.findIndex(it=>it.id === item.id);
      if(index > -1)
      items.value.splice(index, 1);
      game.value.takeItem(item);
    }


    function moveDrag(ev: MouseEvent){
            if(dragging.value){
                dragging.value.x = ev.x - (dragging.value.width / 2);
                dragging.value.y = ev.y - (dragging.value.width / 2);
            }
        }
        function drop(){
            console.log("STOP");
            dragging.value = null;
        }

        function selectItem(item: any){
          dragging.value = item;
        }

    return { game, items, playerInventory, takeObject, playerSpeech, dragging, moveDrag, drop, selectItem };
  }
}
</script>

<style scoped>
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
</style>
