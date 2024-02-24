<template>
    <div class="inventory">
        <img :src="item.image" @mouseup="onDrop(item)" draggable="false" @mousedown="startDrag(item)" v-for="item in data"/>
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
    background: black;
}
.inventory img {
    width: 50px;
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
</style>