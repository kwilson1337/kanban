export const useCategories = () => {
    const fetchTaskCategories = async (taskId: number) => {
        const results = await $fetch(`/api/task/${taskId}/categories`)
        return results
    }

    return {
        fetchTaskCategories
    }
}