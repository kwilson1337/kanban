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

            <div v-if="props.task.isEditing && canSubmit" class="task-container__submit mt-3">
                <UButton class="w-full justify-center" color="white" variant="outline">Submit</UButton>
            </div>
        </div>
    </div>    
</template>

<script setup lang="ts">
import { formatDate } from '@/utils/formate-date'
import EditableInput from '../inputs/EditableInput.vue'
import DatePicker from '@/components/date-picker/index.vue'

const props = defineProps({
    task: {
        type: Object,
        default: () => ({})
    }
})
const defaultCalendarValue = ref(new Date())

const canSubmit = ref(false)
watch(() => [props.task.taskName, defaultCalendarValue.value], (newVal, oldVal) => {
    if(newVal[0] && newVal[1]) {
        canSubmit.value = true
    } else {
        canSubmit.value = false
    }
})
</script>

<style lang="scss" scoped>
.task-container {
    background-color: #fb64b6;
    border-radius: 8px;
    padding: 15px;    
}
</style>