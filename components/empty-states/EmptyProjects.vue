<template>
    <div>
        <UContainer class="grad-border">
            <div class="p-8">
                <h2 class="text-xl text-center">
                    There are no projects at this time
                </h2>
                <div class="flex justify-center items-center mt-3">
                    <UButton @click="toggleModal">Create A Project</UButton>
                </div>
            </div>            
        </UContainer>
    </div>
</template>

<script setup lang="ts">
import { useGlobalNewProjectStore } from '@/stores/globalNewProjectModal'
const { toggleModal } = useGlobalNewProjectStore()
</script>