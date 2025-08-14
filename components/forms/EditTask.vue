<template>
    <div class="edit-task-form">        
        <div class="edit-task-form__inner">                
            <div v-if="formObject" class="edit-task-form__input-container grid gap-3">                
                <div 
                    v-for="taskKey in Object.keys(formObject)"
                    :key="taskKey"
                    class="edit-task-form__input"                
                >                                         
                    <label class="block mb-1">{{ formLabels[taskKey] }}</label>                                                            
                    <component 
                        :is="setInputComponent(formLabels[taskKey])" 
                        value-attribute="id"
                        v-model="formObject[taskKey]"
                        :options="setDayWithOptions(formLabels[taskKey])"                        
                        :date="formObject[taskKey]"
                        @dateInput:update="updateData"
                        :multiple="formLabels[taskKey] === formLabels.selectedCategories ? true : false"
                    />
                </div>
            </div>            
        </div>
    </div>    
</template>

<script lang="ts" setup>
import EditableInput from '../inputs/EditableInput.vue';
import type { Task } from '~/types/Task';
import type { Status } from '~/types/Status';
import { cloneObject } from '~/utils/clone-object'
import { isEqual } from 'lodash-es';
import { UTextarea, USelectMenu } from '#components'
import { useProjectStatus } from '#imports';
import type { Users } from '~/types/Users';
import { useUsers } from '@/composables/useUsers';
import DateInput from '../inputs/DateInput.vue';
import { useTasks } from '@/composables/useTasks'
import { useCategories } from '@/composables/useCategories';
import type { Category } from '~/types/Category';

interface FormLabels {
    [taskName: string]: string
    taskDescription: string
    statusId: string
    taskOwner: string
    dueDate: string
    selectedCategories: string
}

interface Props {
    task: Task,
    submitClick: number
}
const props = withDefaults(defineProps<Props>(), {
    submitClick: 0
})
const emits = defineEmits(['editTask:canSubmit', 'editTask:closeModal'])

const formLabels = {
    taskName: 'Task Name',
    taskDescription: 'Task Description',
    selectedCategories: 'Categories',    
    statusId: 'Status',
    taskOwner: 'Task Owner',
    dueDate: 'Due Date'    
} as FormLabels

const { fetchProjectStatuses } = useProjectStatus()
const { fetchUserById } = useUsers()
const { fetchTaskCategories } = useCategories()
const formObject = ref<Partial<Task>>()
const orignalTask = ref<Partial<Task>>()
onMounted(async () => {    
    await Promise.allSettled([
        fetchStatuses(Number(props.task.projectId)),
        fetchUsers(Number(props.task.taskOwner)),
        fetchCategories(Number(props.task.id))
    ])    
    
    const copyOfTask = cloneObject(props.task, ['id', 'ordinal', 'createdDate', 'beenMoved', 'projectId'])    
    orignalTask.value = formatFormObject({
        ...copyOfTask, 
        selectedCategories: selectedCategories.value
    })
    formObject.value = formatFormObject(orignalTask.value)    
})

const formatFormObject = (obj: Partial<Task>) => {
    const objOrderKeys = Object.keys(formLabels)
    const formatted = {}
    objOrderKeys.forEach(key => {
        formatted[key] = obj[key]
    })

    return {...formatted}
}

const setIfFormCanSubmit = (canSubmit: boolean) => {    
    emits('editTask:canSubmit', canSubmit)
}
watch(() => [orignalTask.value, formObject.value], (newVal) => {
    const oldObj = newVal[0]
    const newObj = newVal[1]
  
    if(newObj && oldObj) {
        setIfFormCanSubmit(!isEqual(oldObj, newObj))
    }
}, { deep: true, immediate: true })

const projectStatuses = ref<Status[]>([])
const fetchStatuses = async (projectId: number) => {
    const { data } = await fetchProjectStatuses(projectId)
    if(data.length) {
        projectStatuses.value = data.map((item: { id: number; statusName: string; }) => ({
            id: item.id,
            label: item.statusName
        }))
    }        
}

const selectedCategories = ref<Category[]>([])
const allCategories = ref<Category[]>([])
const fetchCategories = async (taskId: number) => {
    const { data } = await fetchTaskCategories(taskId)
    if(data.length) {
        selectedCategories.value = data.map(category => ({
            label: category.categoryName,
            id: category.id,            
        }))

        console.log('selectedCategories.value', selectedCategories.value)

        allCategories.value.push(...selectedCategories.value)
        console.log('allCategories.value', allCategories.value)
    }        
}

const users = ref<Users[]>([])
const fetchUsers = async (userId: number) => {
    const { data } = await fetchUserById(userId)    
    if(data.length) {
        users.value = data.map((user: { id: number; firstName: string; lastName: string }) => ({
            id: user.id,
            label: `${user.firstName} ${user.lastName}`
        })) 
    }
}

const setInputComponent = (type: string) => {
    if(type === formLabels.taskName) {
        return EditableInput
    }    

    if(type === formLabels.taskDescription) {
        return UTextarea
    }

    if(type === formLabels.selectedCategories) {
        return USelectMenu
    }
    
    if(
        type === formLabels.taskOwner || 
        type === formLabels.statusId
    ) {
        return USelectMenu
    }    

    if(type === formLabels.dueDate) {
        return DateInput
    }
}

const setDayWithOptions = (key: string) => {
    if(key === formLabels.statusId) {        
        return projectStatuses.value
    }

    if(key === formLabels.taskOwner) {        
        return users.value
    }

    if(key === formLabels.selectedCategories) {        
        return allCategories.value
    }
}

const updateData = (date: Date) => {
    if(formObject.value) {
        formObject.value.dueDate = date
    }    
}

const { updateTask } = useTasks()
watch(() => props.submitClick, async (newVal, oldVal) => {
    if(newVal !== oldVal && formObject.value) {        
        const result = await updateTask({
            ...props.task,
            ...formObject.value            
        })

        if(result) {
            emits('editTask:closeModal', result.statusCode)
        }        
    }            
})
</script>