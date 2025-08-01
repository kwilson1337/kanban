<template>
    <div class="status-management">
        <div class="status-management__inner">
            <EditableList 
                class="p-6"
                :list="props.projectStatuses" 
                :project-id="props.projectId"
            />
        </div>
            
        <div class="status-management__actions p-4 mt-4">
            <UButton 
                class="mr-3" 
                color="yellow"
                @click="emits('statusManagement:closeModal')"
            >
                Cancel
            </UButton>
            <UButton>Submit</UButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Status } from '@/types/Status'
import EditableList from '~/components/lists/editable/EditableList.vue'

interface Props {
    projectStatuses: Status[],
    projectId: number | string
}
const props = defineProps<Props>()
const emits = defineEmits(['statusManagement:closeModal'])
</script>

<style lang="scss" scoped>
.status-management {

    &__actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-top: 1px solid #4ade80;               
    }
}
</style>