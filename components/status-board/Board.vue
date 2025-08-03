<template>
    <div class="single-status-board">        
        <div class="single-status-board__inner">            
            <div class="single-status-board__header">
                <p class="mb-0">{{ props.status.statusName }}</p>
                <UButton icon="i-heroicons-plus" @click="createTask" />
            </div>
            
            <div class="single-status-board__drop-zone mt-6">
                <Draggable
                    v-model="props.status.tasks"
                    itemKey="id"
                    v-bind="dragOptions"       
                    delay="120"                                                    
                >
                    <template #item="{ element }">
                        <TaskComp                             
                            :task="element"           
                            :currentStatusId="props.status.id"                 
                            @task:submitQuickTask="addQuickTask"
                            @task:deleteTask="deleteTaskFromBoard"
                        />
                    </template>
                </Draggable>                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Status } from '~/types/Status';
import TaskComp from '../tasks/Task.vue';
import { nanoIdNumbers } from '#imports';
import { useUserStore } from '@/stores/user'
import type { Task } from '~/types/Task';
import { useTasks } from '@/composables/useTasks'
import Draggable from "vuedraggable";
import type { SortableEvent } from 'sortablejs';

interface Props {
    status: Status    
}
const props = defineProps<Props>()
const { currentUser } = useUserStore()

const createTask = () => {
    const taskObj = {
        id: nanoIdNumbers(),
        statusId: props.status.id,
        projectId: props.status.projectId,
        taskName: '',       
        taskDescription: '',
        taskOwner: currentUser.id,
        dueDate: '',
        isEditing: true
    }

    props.status.tasks.unshift(taskObj)
}

const dragOptions = computed(() => {
    return {
        animation: 200,
        group: "board",
        disabled: false,
        ghostClass: "--ghost-elm",                        
    }
})

const deleteTaskFromBoard = (data: Task) => {
    const foundTask = props.status.tasks.findIndex(task => task.id === data.id)    
    props.status.tasks.splice(foundTask, 1)
}

const { insertQuickTask } = useTasks()
const addQuickTask = async (data: Task) => {
    await insertQuickTask(data, data.projectId)
}
</script>

<style lang="scss" scoped>
.single-status-board {
    background-color: #1f1f21;
    height: 100%;
    padding: 15px 10px;
    border-radius: 8px;        
    flex-shrink: 0;
    min-height: 100vh;
    position: relative;

    &.--expand {
        flex-basis: 250px;
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__drop-zone {
       position: absolute;
       left: 0px;
       width: 100%;
       height: 100%;
       padding: 0px 10px;       

       > div {
            display: flex;
            flex-direction: column;
            gap: 15px; 
            height: 100%;
       }       
    }
}
</style>