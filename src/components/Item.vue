<template>
    <button @click="onClick" @mouseup="onDrop" :style="computedStyle">
        <img :src="data.image"/>
    </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
    props: {
        data: { type: Object, default: {}},
        currentItem: { type: Object},
        game: { type: Object }
    },
    emits: ["interaction", "use"],
    setup(props, { emit }){
        const computedStyle = computed(()=>{
            const arr: string[] = [
                `top: ${props.data.y}px`,
                `left: ${props.data.x}px`,
                `width: ${props.data.width}px`,
                `height: ${props.data.height}px`,
            ]
            console.log(arr.join(";"))
            return arr.join(";");
        });

        function onDrop(){
            if(props.currentItem){
                (props.game as any).useItems(props.currentItem, props.data)
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
    }

    .debug button {
        border: 2px solid red;
    }

    img {
        width: 100%;
        height: 100%;
    }
</style>