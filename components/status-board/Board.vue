<template>
    <div class="single-status-board">
        <div class="single-status-board__inner">
            <div class="single-status-board__drop-zone">
                {{ props.status.statusName }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Status } from '~/types/Status';

interface Props {
    status: Status
}

const props = defineProps<Props>()
</script>