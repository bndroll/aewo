<template>
    <div class="podshipnik-container d-flex justify-space-between pa-2 mb-1">
        <span>1 п-к</span>
        <div class="d-flex align-center justify-space-between">
            <Chip />
            <Chip />
        </div>
    </div>
</template>

<script>
import Chip from "./chip.vue"

export default {
    components: { Chip },
    name: 'podshipnik-component'
}
</script>

<style>
.podshipnik-container {
    background: #FAFAFA;
    border-radius: 4px;
}
</style>