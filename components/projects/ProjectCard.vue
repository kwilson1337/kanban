<template>
    <div class="project-card grad-border">
        <div class="project-card__inner p-3">
            <div class="project-card__content flex items-center justify-between">
                {{ props.project.projectName }}
                <UBadge :label="formatDate(props.project.createdDate)" />
            </div>
            <div class="project-card__button mt-3">
                <UButton @click="routeToProject(props.project.id)" label="View Project" class="w-full justify-center" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Project } from '@/types/Project'
import { useRouter } from 'vue-router';
import { formatDate } from '@/utils/formate-date'

interface ProjectInterface {
    project: Project
}
const props = defineProps<ProjectInterface>()

const router = useRouter()
const routeToProject = (id: number) => {
    router.push({
        path: `/project/${id}`
    })
}
</script>