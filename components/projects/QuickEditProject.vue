<template>
    <div class="quick-edit-project">        
        <div class="quick-edit-project__inner flex items-center gap-3">            
            <p class="mb-0 w-full flex items-center gap-2 relative">                
                <span 
                    v-if="!isEditing" 
                    class="dbl-click-overlay" 
                    @dblclick="isEditing = !isEditing">
                </span>
                <EditableInput 
                    v-model="projectNameCopy" 
                    :disabled="!isEditing"
                    @keydown.enter.stop="handleEnterSubmit"            
                />
                <UBadge :label="formatDate(props.projectData.createdDate)" />
         
            </p>  

            <UButton 
                :class="{'--show' : isEditing}"
                :color="isEditing ? 'green' : 'white'"
                variant="outline"
                :icon="handleIconType"       
                @click="handleSubmitOrEdit"   
                :disabled="isEditing ? !canSubmit : false"
            />
            <UButton 
                v-if="isEditing"
                color="red"
                :class="{'--show' : isEditing}"
                variant="outline"
                icon="i-heroicons-x-mark"       
                @click="cancelEdit"                                       
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Project } from '~/types/Project';
import { formatDate } from '@/utils/formate-date'
import EditableInput from '../inputs/EditableInput.vue';
import { useProjects } from '@/composables/useProjects';
import { cloneObject } from '@/utils/clone-object';

interface Props {
    projectData: Project
}
const props = defineProps<Props>()
const isEditing = ref(false)

const projectNameCopy = ref(props.projectData.projectName)
const originalTitle = ref(props.projectData.projectName)
const canSubmit = ref(false)
watch(() => [projectNameCopy.value, originalTitle.value], (newVal) => {
    if(newVal[0] && newVal[0] !== newVal[1]) {
        canSubmit.value = true
    } else {
        canSubmit.value = false
    }
})

const handleIconType = computed(() => {
    if(isEditing.value) return 'i-heroicons-check'    

    return 'i-heroicons-pencil-square'
})

const cancelEdit = () => {
    projectNameCopy.value = props.projectData.projectName
    isEditing.value = false
}

const { updateProjectName } = useProjects()
const handleSubmitOrEdit = async () => {
    if(canSubmit.value) {
        const projObj = { projectName: projectNameCopy.value }
        const newProjVal = {
            ...cloneObject(props.projectData, ['status']),
            ...projObj
        }
        
        const { statusCode } = await updateProjectName(newProjVal, props.projectData.id)
        if(statusCode !== 200) {
            projectNameCopy.value = props.projectData.projectName
        }
    }


    isEditing.value = !isEditing.value
}

const handleEnterSubmit = async () => {
    if(!canSubmit.value) return 

    await handleSubmitOrEdit()
}
</script>

<style lang="scss" scoped>
.quick-edit-project {

    &__inner {
        button {
            opacity: 0;
            visibility: hidden;
            transition: .2s ease-in-out all;
        }
       
        &:hover {
            button {
                opacity: 1;
                visibility: visible;
            }
        }

        button.--show {
            opacity: 1;
            visibility: visible;
        }

        &:deep(input) {
            field-sizing: content;
        }
    }
}
</style>