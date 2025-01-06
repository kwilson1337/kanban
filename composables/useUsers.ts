import type { Users } from '~/types/Users'

export const useUsers = () => {
    
    const currentUser = ref<Users>() 
    const fetchUserById = async (id: number) => {
        const result = await $fetch(`/api/users/${id}`)
        currentUser.value = result.data[0]
    }

    return {
        fetchUserById,
        currentUser
    }
}