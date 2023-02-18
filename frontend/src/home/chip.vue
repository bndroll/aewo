<template>
    <div class="chip-container mx-1 pa-1 d-flex align-center justify-space-between">
        <span>T</span>
        <v-icon x-small color="#868686">mdi-thermometer</v-icon>
    </div>
</template>

<script>
export default {
    name: 'chips-component'
}
</script>

<style>
.chip-container {
    width: 34px;
    height: fit-content;
    background: #F4F4F4;
    border: 1px solid #CCCCCC;
    border-radius: 2px;
    font-weight: 300;
    font-size: 13px;
    line-height: 15px;
}
</style>