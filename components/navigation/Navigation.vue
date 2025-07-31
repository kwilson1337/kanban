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
import { useUserStore } from '@/stores/user'

const emits = defineEmits<{
    (e:'createProject:navigation'): void
}>()

const userStore = useUserStore()
const currentUser = computed(() => userStore.currentUser)
</script>

<style lang="scss" scoped>
.navigation {
    border-bottom: 1px solid #4ade80;    
}
</style>