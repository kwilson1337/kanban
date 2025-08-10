<template>
    <div class="date-input">
        <div class="date-input__inner flex gap-3 items-center">
            {{ formatDate(dateCopy) }}

             <UPopover :popper="{ placement: 'bottom-start' }">
                <UButton 
                    color="white"
                    variant="outline"
                    icon="i-heroicons-calendar-days-20-solid"                                              
                />

                <template #panel="{ close }">
                    <DatePicker v-model="dateCopy" is-required @close="close" />
                </template>
            </UPopover>
        </div>
    </div>
</template>

<script setup lang="ts">
import DatePicker from '@/components/date-picker/index.vue'
import { formatDate, formatDateForSubmit } from '@/utils/formate-date'

const emits = defineEmits(['dateInput:update'])
const props = defineProps({
    date: {
        type: [String || Date],
        default: ''
    }   
})

const dateCopy = ref(props.date)
watch(dateCopy, (newdate) => {
    emits('dateInput:update', formatDateForSubmit(newdate))
})
</script>