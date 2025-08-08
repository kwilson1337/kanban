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
                    v-bind="$attrs"
                />
            </div>            
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Status } from '@/types/Status'
import BoardColumn from './Board.vue';
import { useTasks } from '@/composables/useTasks'

interface Props {
    projectStatuses: Status[],
    projectId: number
}
const props = defineProps<Props>()
const gridCount = ref(props.projectStatuses.length)


const { updateTaskStatus } = useTasks()
const tasksThatHaveBeenMoved = computed(() => {
    return props.projectStatuses.flatMap(status => status.tasks.filter(task => task.beenMoved))
})
watch(() => tasksThatHaveBeenMoved.value, async (newVal) => {
    if(newVal.length) {
        console.log(newVal)
        const submitData = newVal.map(task => ({
            id: task.id,
            statusId: task.statusId,
            ordinal: task.ordinal
        }))        

        await updateTaskStatus(submitData, props.projectId)
        
        newVal.forEach(task => {
            task.beenMoved = false
        })
    }   
}, { flush: 'post' })

watch(() => props.projectStatuses, () => {        
    gridCount.value = props.projectStatuses.length
}, { deep: true })
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