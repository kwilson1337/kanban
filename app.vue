<template>
  <Navigation @createProject:navigation="toggleModal" />
  <ProjectDashboard 
    :key="projectDashKey"
  />

  <UModal v-model="showModal">
    <div class="p-4">
      <NewProjectForm @newProject:newProjectForm="updateProjects" />      
    </div>
  </UModal>
</template>

<script setup lang="ts">
import ProjectDashboard from '@/components/projects/ProjectDashboard.vue'
import Navigation from './components/navigation/Navigation.vue';
import NewProjectForm from './components/forms/NewProjectForm.vue';


const showModal = ref(false)
const toggleModal = () => {
  showModal.value = !showModal.value
}

const projectDashKey = ref(1)
const updateProjects = async () => {
  projectDashKey.value ++  
  toggleModal()
}
</script>
