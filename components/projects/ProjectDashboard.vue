<template>
    <UContainer>    
        <LoadingState v-if="isLoadingProjects" />
        
        <div v-if="!isLoadingProjects">
            <ProjectCardList 
                v-if="allProjects.length"
                class="mt-5"
                :projects="allProjects" 
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

const { allProjects, fetchProjects, isLoadingProjects } = useProjects()


onMounted(async () => {
    await fetchProjects()    
})
</script>