<template>
    <div class="aglomachine-container pa-2">
        <div class="aglomachine-header px-4 py-2 mb-2">
            <span>Агломашина 1</span>
        </div>
        <div class="w-100 d-flex justify-space-between">
            <exhauster />
            <exhauster />
        </div>
    </div>
</template>

<script>
import exhauster from "./exgauster.vue"

export default {
    components: { exhauster },
    name: 'podshipnik-component'
}
</script>

<style>
.aglomachine-container {
    width: 624px;
    height: fit-content;
    border: 1px solid #E6E6E6;
    border-radius: 16px;
}

.aglomachine-header {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #6E6E6D;
    background: #F5F5F5;
    border: 1px solid #E6E6E6;
    border-radius: 8px;
}
</style>