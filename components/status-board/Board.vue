<template>
    <div class="single-status-board">
        <div class="single-status-board__inner">
            <div class="single-status-board__header">
                <p class="mb-0">{{ props.status.statusName }}</p>
                <UButton icon="i-heroicons-plus" @click="createTask" />
            </div>
            
            <div class="single-status-board__drop-zone mt-6">
                {{ status }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Status } from '~/types/Status';
import type { Task } from '~/types/Task';

interface Props {
    status: Status
}
const props = defineProps<Props>()

const createTask = () => {

}
</script>

<style lang="scss" scoped>
.single-status-board {
    background-color: #1f1f21;
    height: 100%;
    padding: 15px 10px;
    border-radius: 8px;        
    flex-shrink: 0;
    height: 100vh;

    &.--expand {
        flex-basis: 250px;
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>