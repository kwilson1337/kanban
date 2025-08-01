<template>
    <li>
        <UInput 
            v-model="localStatusList.statusName" 
            placeholder="Status name"
            size="xl"        
            :ui="{ icon: { trailing: { pointer: 'pointer-events-auto' } } }"                                 
        >                        
            <template v-if="localStatusList.statusName.length" #trailing>
                <UButton 
                    :disabled="false"
                    color="yellow"
                    @click="emits('listItem:removeItem', localStatusList.id)"
                    aria-label="clear status name"
                    icon="i-heroicons-x-mark"
                />
            </template>
        </UInput>
    </li>
</template>

<script lang="ts" setup>
import type { Status } from '~/types/Status';
interface Props {
    status: Status
}
const props = defineProps<Props>()
const emits = defineEmits(['listItem:removeItem'])
const localStatusList = ref({...props.status})
</script>