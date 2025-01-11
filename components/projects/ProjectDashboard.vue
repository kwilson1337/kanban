<template>
    <UContainer>    
        <LoadingState 
            v-if="isLoadingProjects" 
            :group-count="3"
        />
        
        <div v-if="!isLoadingProjects">
            <ProjectCardList 
                v-if="projectStore.projectList.length"
                class="mt-5"
                :projects="projectStore.projectList" 
            />

            <EmptyProjects 
                v-else 
                class="mt-5"
            />
        </div>
    </UContainer>
</template>

<script setup>
import ProjectCardList from '@/components/projects/ProjectCardList.vue'
import { useProjects } from '~/composables/useProjects'
import EmptyProjects from '../empty-states/EmptyProjects.vue';
import LoadingState from '../loading-states/LoadingState.vue';
import { useProjectStore } from '@/stores/project';

const { allProjects, fetchProjects, isLoadingProjects } = useProjects()
const projectStore = useProjectStore()

onMounted(async () => {
    await fetchProjects()    
    projectStore.setProjectList(allProjects.value)
})
</script>