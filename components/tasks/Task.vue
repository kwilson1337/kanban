<template>
    <div v-if="props.task" class="task-container">
        <div class="task-container__inner">
            <div class="task-container__header flex items-center justify-between gap-4">
                <p class="mb-0">                    
                    <EditableInput 
                        ref="taskTitle"
                        v-model="props.task.taskName" 
                        :disabled="!props.task.isEditing" 
                        :variant="props.task.isEditing ? 'outline' : 'none'"      
                        color="rose"                          
                    />
                </p>                
                <p v-if="!props.task.isEditing" class="mb-0">{{ formatDate(props.task.dueDate) }}</p>
                
                <UPopover v-else :popper="{ placement: 'bottom-start' }">
                    <UButton 
                        color="white"
                        variant="outline"
                        icon="i-heroicons-calendar-days-20-solid"                         
                        ref="calendarButton"
                    />

                    <template #panel="{ close }">
                        <DatePicker v-model="defaultCalendarValue" is-required @close="close" />
                    </template>
                </UPopover>
            </div>

            <div class="task-container__desc mt-3">
                {{ props.task.taskDescription }}
            </div>
        </div>
    </div>    
</template>

<script setup lang="ts">
import { formatDate } from '@/utils/formate-date'
import EditableInput from '../inputs/EditableInput.vue'
import DatePicker from '@/components/date-picker/index.vue'

const props = defineProps({
    task: Object,
    default: () => ({})
})
const defaultCalendarValue = ref(new Date())

const taskTitle = ref<HTMLInputElement | null>(null);
watch(() => props.task, (newVal) => {
    console.log(newVal)
    if(newVal && newVal.isEditing) {
       nextTick(() => {                        
            taskTitle.value?.$el.querySelector('input')
        });
    }
}, { deep: true })
</script>

<style lang="scss" scoped>
.task-container {
    background-color: #fb64b6;
    border-radius: 8px;
    padding: 15px;    
}
</style>