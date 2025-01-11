import { defineStore } from 'pinia'
import type { Users } from '~/types/Users'

export const useUserStore = defineStore('userStore', () => {

    const currentUser = ref<Users | null>(null)
    const setUser = (user: Users) => {
        currentUser.value = user
    }

    const fetchUserById = async (id: number) => {
        const result = await $fetch(`/api/users/${id}`)        
        setUser(result.data[0])
    }
    
    return {
        fetchUserById,
        setUser,
        currentUser
    }
})