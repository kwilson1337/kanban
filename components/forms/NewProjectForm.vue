<template>
    <div class="new-project-form p-4">
        <div class="new-project-form__inner">
            <div class="new-project-form__inputs">
                <UInput v-model="projectName" placeholder="Project name" />
            </div>            

            <div class="new-project-form__submit mt-3">
                <UButton                 
                    @click="submitNewProject" 
                    label="Create project" 
                    class="w-full justify-center"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useProjects } from '~/composables/useProjects'

const emits = defineEmits<{
    (e: 'newProject:newProjectForm'): void
}>()

const { createProject } = useProjects()

const projectName = ref('')
const submitNewProject = async () => {
    await createProject(projectName.value)
    emits('newProject:newProjectForm')
}
</script>