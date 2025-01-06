<template>
    <div class="project-list">
        <div class="project-list__title mb-6">
            <h2 class="text-xl">Your projects</h2>
        </div>
        <div 
            v-if="props.projects.length" 
            class="project-list__projects grid lg:grid-cols-4 md:grid-cols-2 gap-4"
        >
            <ProjectCard 
                v-for="project in props.projects"
                :key="project.id"
                :project="project"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import ProjectCard from '@/components/projects/ProjectCard.vue'
import type { Project } from '@/types/Project'

interface ProjectsInterface {
    projects: Project[]
}
const props = defineProps<ProjectsInterface>()
</script>