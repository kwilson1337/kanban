<template>
    <div class="single-project">
        <div class="single-project__inner">
            <UContainer v-if="singleProject">
                <div class="single-project__name">
                    <p class="mb-0">
                        <span class="mr-2">{{ singleProject.projectName }}:</span>
                        <UBadge :label="formatDate(singleProject.createdDate)" />
                    </p>                    
                </div>
            </UContainer>
        </div>        
    </div>
</template>

<script setup lang="ts">
import { useProjects } from '@/composables/useProjects';
import { useRoute } from 'vue-router';

const route = useRoute()
const { fetchProjectById, singleProject } = useProjects()

onMounted(async () => {        
    await fetchProjectById(Number(route.params.id))        
})
</script>