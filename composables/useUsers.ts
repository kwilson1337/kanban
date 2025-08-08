export const useUsers = () => {
    const fetchUserById = async (userId: number) => {
        const result = await $fetch(`/api/users/${userId}`)
        
        if(result) {
            return result
        }

        return []
    }

    return {
        fetchUserById
    }
}