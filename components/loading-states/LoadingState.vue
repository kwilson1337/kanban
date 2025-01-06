<template>
    <div class="loading-state">
        <div 
            v-for="num in props.groupCount"
            :key="num"
            class="loading-state__inner space-y-3"            
            :class="{'mt-3' : num > 1}"
        >            
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-[calc(100%-60px)]" />
            <USkeleton class="h-4 w-full" />
        </div>       
    </div>
</template>

<script setup lang="ts">
interface Props {
  groupCount?: number
}

const props = withDefaults(defineProps<Props>(), {
    groupCount: 1
})
</script>