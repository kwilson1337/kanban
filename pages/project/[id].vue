<template>
    <div class="single-project">
        <div class="single-project__inner">
            <UContainer v-if="singleProject">                            
                <div class="single-project__name flex items-center">
                    <button @click="goBack" class="flex items-center justify-center">
                        <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 mr-3" />
                    </button>
                    <p class="mb-0 w-full">
                        <span class="mr-2">{{ singleProject.projectName }}:</span>
                        <UBadge :label="formatDate(singleProject.createdDate)" />
                    </p>     
                    
                    <UButton @click="showStatusModal = true">Update Project Statuses</UButton>
                </div>

                <div class="single-project__board mt-6"> 
                    <StatusBoard :projectStatuses="singleProject.status" />
                </div>
            </UContainer>
        </div>        
    </div>

    <UModal v-model="showStatusModal">
        <StatusManagement 
            :projectStatuses="singleProject.status" 
            :project-id="singleProject.id"
            @statusManagement:closeModal="showStatusModal = false"
            @statusManagement:submit="closeAndFetchStatuses"
        />   
    </UModal>
</template>

<script setup lang="ts">
import { useProjects } from '@/composables/useProjects';
import { useRoute, useRouter } from 'vue-router';
import StatusBoard from '@/components/status-board/StatusBoard.vue';
import StatusManagement from '~/components/forms/StatusManagement.vue';
import type { Project } from '~/types/Project';

const router  = useRouter()
const route = useRoute()
const { fetchProjectById, fetchProjectStatuses } = useProjects()

const singleProject = ref<Project>()
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
</script>