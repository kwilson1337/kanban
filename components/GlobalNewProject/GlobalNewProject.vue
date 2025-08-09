<template>
    <UModal v-model="globalNewProjectModalStore.showModal">
      <div class="p-4">
        <NewProjectForm @newProject:newProjectForm="updateProjects" />      
      </div>
    </UModal>
</template>

<script setup lang="ts">
import { useGlobalNewProjectStore } from '@/stores/globalNewProjectModal'
import { useProjectStore } from '@/stores/project';
import { useProjects } from '@/composables/useProjects'
import NewProjectForm from '../forms/NewProjectForm.vue';

const globalNewProjectModalStore = useGlobalNewProjectStore()
const projectStore = useProjectStore()

const { fetchProjects, allProjects } = useProjects()
const updateProjects = async () => {   
  await fetchProjects() 

  projectStore.setProjectList(allProjects.value)  
  globalNewProjectModalStore.toggleModal()
}
</script>