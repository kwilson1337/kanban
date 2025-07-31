<template>
  <NuxtLayout>
    <Navigation @createProject:navigation="toggleModal" />

    <div class="app-page-wrapper mt-10">
      <NuxtPage></NuxtPage>
    </div>

    <UModal v-model="showModal">
      <div class="p-4">
        <NewProjectForm @newProject:newProjectForm="updateProjects" />      
      </div>
    </UModal>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Navigation from './components/navigation/Navigation.vue';
import NewProjectForm from '@/components/forms/NewProjectForm.vue';
import { useUserStore } from '@/stores/user'
import { userId } from '@/constants/user'
import { useProjects } from '@/composables/useProjects'
import { useProjectStore } from '@/stores/project';

const userStore = useUserStore()
const projectStore = useProjectStore()

onBeforeMount(async () => {
  await userStore.fetchUserById(userId)
})

const showModal = ref(false)
const toggleModal = () => {
  showModal.value = !showModal.value
}

const { fetchProjects, allProjects } = useProjects()
const updateProjects = async () => {   

  await fetchProjects() 
  projectStore.setProjectList(allProjects.value)

  toggleModal()
}
</script>