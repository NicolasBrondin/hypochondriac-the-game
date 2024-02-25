<template>
    <div class="inventory">
        <button class="item" @mouseup="onDrop(item)" draggable="false" @mousedown="startDrag(item)" v-for="item in data">
            <img :src="item.icon"/>
        </button>
        <button class="item" v-for="placeholder in new Array(10 - data?.length).fill(0)">
            <div style="width: 40px; height: 40px;"></div>
        </button>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent  } from 'vue';
import { GameController, GameItem } from '../engine/GameController';

export default defineComponent({
    props: {
        data: { type: Object }, 
        currentItem: { type: Object as PropType<GameItem> },
        game: { type: Object as PropType<GameController> }
    },
    emits: [ "selection" ],
    setup(props, { emit }){
        
        function startDrag(item: any){
            emit("selection", {...item})
        }

        function onDrop(item: any){
            if(props.currentItem && props.currentItem.id != item.id){
                props.game?.mergeItems(props.currentItem, item);
            }
        }

        return { startDrag, onDrop };
    }
});
</script>

<style scoped>
.inventory {
    background: #3085C3;
    padding: 10px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-items: flex-start;
}
.inventory img {
    width: 40px;
    height: 40px;
}

.dragged {
    position: absolute;
    pointer-events: none;
}

.item {
    background: #F4E869;
    border: 0;
    outline: 0;
    margin: 0;
    padding: 0;
}

img, button {
    
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;

  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}
</style>