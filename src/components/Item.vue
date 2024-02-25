<template>
    <button @click="onClick" @mouseup="onDrop" :style="computedStyle">
        <img :src="data.image" v-if="data.image"/>
    </button>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';
import { GameController } from '../engine/GameController';

export default defineComponent({
    props: {
        container: { type: Object },
        data: { type: Object, default: {}},
        currentItem: { type: Object},
        game: { type: Object as PropType<GameController> }
    },
    emits: ["interaction", "use"],
    setup(props, { emit }){
        const computedStyle = computed(()=>{
            const ratio = props.game?.playgroundSize.height / props.game?.playgroundSourceSize.height;
            const width = props.data.width * ratio;
            const height = props.data.height * ratio;
            const x = (props.data.x * ratio) - (width / 2);
            const y = (props.data.y * ratio) - (width / 2);
            const arr: string[] = [
                `top: calc(50% + ${y}px)`,
                `left: calc(50% + ${x}px)`,
                `width: ${width}px`,
                `height: ${height}px`,
            ]
            console.log(arr.join(";"))
            return arr.join(";");
        });

        function onDrop(){
            if(props.currentItem){
                (props.game as any).useItems(props.data, props.currentItem)
            }
        }

        function onClick(){
            emit("interaction", props.data);
        }
        return { computedStyle, onClick, onDrop};
    }
});
</script>

<style scoped>
    button {
        position: absolute;
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
    }

    .debug button {
        border: 2px solid red;
    }

    img {
        width: 100%;
        height: 100%;
    }
</style>