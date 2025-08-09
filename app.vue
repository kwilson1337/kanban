<template>
  <NuxtLayout>
    <Navigation />

    <div class="app-page-wrapper mt-10">
      <NuxtPage></NuxtPage>
    </div>

    <GlobalNewProject />
  </NuxtLayout>
  
</template>

<script lang="ts" setup>
import Navigation from './components/navigation/Navigation.vue';
import { useUserStore } from '@/stores/user'
import { userId } from '@/constants/user'
import GlobalNewProject from './components/GlobalNewProject/GlobalNewProject.vue';

const userStore = useUserStore()

onBeforeMount(async () => {
  await userStore.fetchUserById(userId)
})
</script>