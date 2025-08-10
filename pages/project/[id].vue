<template>
    <div class="single-project">
        <div class="single-project__inner">
            <UContainer v-if="singleProject">                
                <div class="single-project__name flex items-center justify-between">
                    <div class="flex items-center">
                        <button @click="goBack" class="flex items-center justify-center">
                            <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 mr-3" />
                        </button>                       
                        <QuickEditProject class="w-full" :project-data="singleProject" />    
                    </div>                
                    <UButton @click="showStatusModal = true">Update Project Statuses</UButton>
                </div>

                <div class="single-project__board mt-6"> 
                    <StatusBoard 
                        :projectStatuses="singleProject.status" 
                        :project-id="singleProject.id"
                        @task:openEditor="handleOpenTaskEditor"
                    />
                </div>
            </UContainer>
        </div>        
    </div>

    <UModal v-model="showStatusModal">
        <div v-if="singleProject">
            <StatusManagement 
                :projectStatuses="singleProject.status" 
                :project-id="singleProject.id"
                @statusManagement:closeModal="showStatusModal = false"
                @statusManagement:submit="closeAndFetchStatuses"                
            />   
        </div>        
    </UModal>

    <UModal v-model="openTaskEditor" fullscreen>
      <UCard
        :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow'
          }
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Task Editor
            </h3>
            <UButton 
                color="gray" 
                variant="ghost" 
                icon="i-heroicons-x-mark-20-solid" 
                class="-my-1" 
                @click="openTaskEditor = false" 
            />
          </div>
        </template>
        
        <EditTask 
            v-if="currentTask"
            :task="currentTask" 
            :submitClick="submitCounter"
            @editTask:canSubmit="handleCanSubmitEditTask"    
            @editTask:closeModal="handleCloseModal"        
        />

        <template #footer>
          <div class="flex justify-between item-center">
            <UButton 
                @click="openTaskEditor = false"  
                color="white" 
                variant="outline"
            >
                Cancel
            </UButton>
            <div class="flex gap-2">
                <UButton                     
                    variant="outline"
                    @click="handleDeleteTask"
                    color="red"
                >
                    Delete
                </UButton>
                <UButton 
                    :disabled="!canSubmitEditTask" 
                    variant="outline"
                    @click="submitCounter++"
                >
                    Save
                </UButton>
            </div>
          </div>
        </template>
      </UCard>
    </UModal>
</template>

<script setup lang="ts">
import { useProjects } from '@/composables/useProjects';
import { useProjectStatus } from '@/composables/useProjectStatus';
import { useRoute, useRouter } from 'vue-router';
import StatusBoard from '@/components/status-board/StatusBoard.vue';
import StatusManagement from '~/components/forms/StatusManagement.vue';
import type { Project } from '~/types/Project';
import type { Task } from '~/types/Task';
import EditTask from '~/components/forms/EditTask.vue';
import { useTasks } from '@/composables/useTasks';
import QuickEditProject from '~/components/projects/QuickEditProject.vue';

const router  = useRouter()
const route = useRoute()
const { fetchProjectById } = useProjects()
const { fetchProjectStatuses } = useProjectStatus()

const singleProject = ref<Project | null>()
onMounted(async () => {        
    singleProject.value = await fetchProjectById(Number(route.params.id))    
})

const showStatusModal = ref(false)

const goBack = () => {
    router.push({
        path: '/'
    })
}

const closeAndFetchStatuses = async () => {
    if(singleProject.value) {
        const fetchedStatuses = await fetchProjectStatuses(singleProject.value.id)

        singleProject.value.status = fetchedStatuses.data         
        showStatusModal.value = false
    }    
}

const openTaskEditor = ref(false)
const currentTask = ref<Task>()
const handleOpenTaskEditor = (task: Task) => {    
    currentTask.value = task        
    openTaskEditor.value = true
}

const submitCounter = ref(0)
const canSubmitEditTask = ref(false)
const handleCanSubmitEditTask = (data: boolean) => {
    canSubmitEditTask.value = data
}

const handleCloseModal = async (status: number) => {
    if(status === 200 && singleProject.value) {                
        singleProject.value = null
        singleProject.value = await fetchProjectById(Number(route.params.id))
    }

    openTaskEditor.value = false
}

const { deleteTask } = useTasks()
const handleDeleteTask = async () => {    
    if(currentTask.value) {
        const { statusCode } = await deleteTask(Number(currentTask.value.id))

        if(statusCode === 200) {
            singleProject.value = await fetchProjectById(Number(route.params.id))
            openTaskEditor.value = false
        }        
    }    
}
</script>