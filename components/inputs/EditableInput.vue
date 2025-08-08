<template>
    <div class="input-container">
        <div class="input-container__input">            
            <UInput v-bind="attrs" />
        </div>
    </div>    
</template>

<script lang="ts" setup>    
const attrs = useAttrs()
</script>

<style lang="scss" scoped>
.input-container {

    &:deep(input) {
        background-color: transparent;        

        &:disabled {
            padding: 0px;
            color: white;
            font-size: 16px;
            opacity: 1;
            cursor: auto;
        }         
    }    

    &.--pointer {
        &:deep(input) {
            &:disabled {
                cursor: pointer;
            }
        }
    }   
}
</style>