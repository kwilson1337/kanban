<template>
    <div v-if="props.task" class="task-container">          
        <div class="task-container__inner">
            <div class="task-container__header flex items-center justify-between gap-3">
                <p class="mb-0">                    
                    <EditableInput 
                        ref="taskTitle"
                        v-model="props.task.taskName" 
                        :disabled="!props.task.isEditing" 
                        :variant="props.task.isEditing ? 'outline' : 'none'"      
                        color="rose"
                        class="--pointer"
                    />
                </p>                                
                <p v-if="!props.task.isEditing" class="mb-0">{{ formatDate(props.task.dueDate) }}</p>                            
                <UPopover v-else :popper="{ placement: 'bottom-start' }">
                    <UButton 
                        color="white"
                        variant="outline"
                        icon="i-heroicons-calendar-days-20-solid"                                              
                    />

                    <template #panel="{ close }">
                        <DatePicker v-model="defaultCalendarValue" is-required @close="close" />
                    </template>
                </UPopover>
            </div>

            <div v-if="props.task.taskDescription" class="task-container__desc mt-3">
                {{ props.task.taskDescription }}
            </div>

            <div 
                v-if="props.task.isEditing" 
                class="task-container__actions mt-3"
                :class="{'--col-2': canSubmit}"
            >
                <UButton
                    v-if="canSubmit"
                    class="w-full justify-center" 
                    color="white" 
                    variant="outline"
                    @click="submitQuickTask"
                >
                    Submit
                </UButton>

                <UButton
                    color="white" 
                    variant="outline"
                    class="w-full justify-center"
                    @click="deleteTask"
                >
                    Cancel
                </UButton>
            </div>
        </div>
    </div>    
</template>

<script setup lang="ts">
import { formatDate, formatDateForSubmit } from '@/utils/formate-date'
import EditableInput from '../inputs/EditableInput.vue'
import DatePicker from '@/components/date-picker/index.vue'
import type { Task } from '~/types/Task'

const emits = defineEmits(['task:submitQuickTask', 'task:deleteTask'])
interface Props {
    task: Task
    currentStatusId: number
}
const props = defineProps<Props>()

watch(() => props.currentStatusId, (newVal) => {
    props.task.statusId = newVal
}, { immediate: true })

const defaultCalendarValue = ref(new Date())
const canSubmit = ref(false)
watch(() => [props.task.taskName, defaultCalendarValue.value], (newVal) => {       
    if(newVal[0] && newVal[1]) {
        props.task.dueDate = newVal[1]
        canSubmit.value = true
    } else {
        canSubmit.value = false
    }
})

const submitQuickTask = () => {    
    const clone = (({ isEditing, id, ...o }) => o)(props.task)     
    
    emits('task:submitQuickTask', {
        taskName: clone.taskName,
        taskDescription: clone.taskDescription,
        statusId: clone.statusId,
        projectId: clone.projectId,
        taskOwner: clone.taskOwner,
        dueDate: formatDateForSubmit(clone.dueDate)
    })

    props.task.isEditing = false
}

const deleteTask = () => {
    emits('task:deleteTask', props.task)
}
</script>

<style lang="scss" scoped>
.task-container {
    background-color: #fb64b6;
    border-radius: 8px;
    padding: 15px;    
    cursor: pointer;    

     &.sortable-chosen {        
        transform: rotate(1deg);     

        &.--ghost-elm {           
            opacity: .5;  
        }
    }  

    &__actions {
        display: grid;
        grid-template-columns: (1fr);
        gap: 10px;

        &.--col-2 {
            grid-template-columns: repeat(2, 1fr);
        }
    }
}
</style>