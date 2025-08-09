import { defineStore } from 'pinia'

export const useGlobalNewProjectStore = defineStore('globalNewProjectModal', () => {
    const showModal = ref(false)

    const toggleModal = () => {
        showModal.value = !showModal.value
    }
    return {
        showModal,
        toggleModal
    }
})