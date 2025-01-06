<template>
    <div class="project-card grad-border">
        <div class="project-card__inner p-3">
            <div class="project-card__content flex items-center justify-between">
                {{ props.project.projectName }}
                <UBadge :label="formatDate(props.project.createdDate)" />
            </div>
            <div class="project-card__button mt-3">
                <UButton label="View Project" class="w-full justify-center" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Project } from '@/types/Project'

interface ProjectInterface {
    project: Project
}
const props = defineProps<ProjectInterface>()

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString()
}
</script>