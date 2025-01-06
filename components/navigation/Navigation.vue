<template>
    <div class="navigation">
        <UContainer>
            <div 
                class="navigation__inner flex items-center py-4"
                :class="[currentUser ? 'justify-between' : 'justify-end']"
            >
                <div v-if="currentUser" class="navigation__left">
                    Welcome, {{ currentUser.firstName }} {{ currentUser.lastName }}
                </div>
                <div class="navigation__right">
                    <UButton @click="emits('createProject:navigation')">New Project</UButton>
                </div>
            </div>
        </UContainer>        
    </div>
</template>

<script setup lang="ts">
import { useUsers } from '@/composables/useUsers'
import { userId } from '@/constants/user'

const emits = defineEmits<{
    (e:'createProject:navigation'): void
}>()

const { fetchUserById, currentUser } = useUsers()
onMounted(async () => {
    await fetchUserById(userId)    
})
</script>