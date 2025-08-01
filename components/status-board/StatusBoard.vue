<template>
    <div 
        class="status-board"
        :class="{'--flex' : gridCount > 4}"
    >
        <div class="status-board__inner">
            <div class="status-board__column-container">
                <BoardColumn 
                    v-if="props.projectStatuses"
                    v-for="status in props.projectStatuses"
                    :status="status"
                    :class="{'--expand' : gridCount > 4}"
                />
            </div>            
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Status } from '@/types/Status'
import BoardColumn from './Board.vue';

interface Props {
    projectStatuses: Status[] 
}
const props = defineProps<Props>()
const gridCount = ref(props.projectStatuses.length)

watch(() => props.projectStatuses, () => {
    gridCount.value = props.projectStatuses.length
})
</script>

<style lang="scss" scoped>
.status-board {    

    &__inner {
        position: relative;                        
        width: 100%;
        overflow: auto;
    }

    &__column-container {
        display: grid;
        grid-template-columns: repeat(v-bind(gridCount), 1fr);
        flex-wrap: nowrap;       
        width: 100%;
        gap: 15px;        

        .--flex & {
            display: flex;            
        }
    }
}
</style>