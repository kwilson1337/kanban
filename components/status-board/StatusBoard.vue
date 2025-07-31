<template>
    <div class="status-board">
        <div class="status-board__inner">
            <Board 
                v-if="props.projectStatuses"
                v-for="status in props.projectStatuses"
                :status="status"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Status } from '@/types/Status'
import Board from './Board.vue';

interface Props {
    projectStatuses: Status[] 
}
const props = defineProps<Props>()
</script>