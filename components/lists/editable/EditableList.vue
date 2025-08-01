<template>
    <div class="editable-list">
        <div class="editable-list__inner">
            <ul class="editable-list__list">                                
                <ListItem 
                    v-for="(status, index) in localStatusList"
                    :status="status"
                    :class="{'mt-2' : index > 0}"
                    @listItem:removeItem="handleRemoveListItem" 
                    @listItem:update="handleUpdateListItem"                   
                />
            </ul>            
        </div>

        <div class="editable-list__action mt-3">
            <UButton @click="addStatus" class="w-full justify-center">Add Status</UButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Status } from '~/types/Status';
import ListItem from './ListItem.vue';
import { nanoid } from 'nanoid';

interface Props {
    list: [] | Status[],
    projectId: number | string
}
const props = defineProps<Props>()
const emits = defineEmits(['editableList:update'])

const localStatusList = ref([...props.list])
const addStatus = () => {
    const statusObj = {
        id: nanoid(),
        statusName: '',
        ordinal: localStatusList.value.length + 1,        
        projectId: props.projectId
    } as Status
    
    localStatusList.value.push(statusObj)
}

const handleRemoveListItem = (id: number | string) => {                
    const findIndex = localStatusList.value.findIndex(obj => obj.id === id)
    localStatusList.value.splice(findIndex, 1)
}

/**
 * Find and update list item
 that is being edited. 
 
 Once updated, emit full list
 to parent for submit
 */
const handleUpdateListItem = (data: Status) => {
    const foundListItem = localStatusList.value.find(listItem => listItem.id === data.id)
    
    if(foundListItem) {
        foundListItem.statusName = data.statusName
    }    

    emits('editableList:update', localStatusList.value)
}
</script>