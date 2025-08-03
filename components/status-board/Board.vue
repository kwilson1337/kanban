<template>
    <div class="single-status-board">        
        <div class="single-status-board__inner">            
            <div class="single-status-board__header">
                <p class="mb-0">{{ props.status.statusName }}</p>
                <UButton icon="i-heroicons-plus" @click="createTask" />
            </div>
            
            <div class="single-status-board__drop-zone mt-6">
                <TaskComp 
                    v-for="(task) in props.status.tasks" 
                    :task="task"
                    @task:submitQuickTask="addQuickTask"
                />
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
    height: 100vh;

    &.--expand {
        flex-basis: 250px;
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__drop-zone {
        display: grid;
        gap: 15px;
    }
}
</style>