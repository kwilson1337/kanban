<template>
    <div class="editable-list">
        <div class="editable-list__inner">
            <ul class="editable-list__list">                
                <ListItem 
                    v-for="(status, index) in filterListItems"
                    :status="status"
                    :class="{'mt-2' : index > 0}"
                    @listItem:removeItem="handleRemoveListItem"                    
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

const localStatusList = ref([...props.list])
const addStatus = () => {
    localStatusList.value.push({
        id: nanoid(),
        statusName: '',
        createdDate: '',
        projectId: props.projectId
    })
}

const idsToRemove = ref(new Set())
const handleRemoveListItem = (id: number | string) => {            
    idsToRemove.value.add(id)
}

const filterListItems = computed(() => {
    const unwantedIds = [...idsToRemove.value]        
    
    if(unwantedIds.length === 0) {
        return localStatusList.value
    }
                
    return localStatusList.value.filter(listItem => !unwantedIds.includes(listItem.id))
})
</script>