<template>
  <div class="nav-bar py-1 px-2 d-flex align-center elevation-1">
    <img src="../assets/logo.png" alt="" class="mr-8" />
    <div class="breadcrumbs d-flex text-body-2">
      <div
        @click="$router.push({ name: 'home' })"
        :class="{
          'active-route': $route.name === 'home',
          'default-route': $route.name !== 'home',
        }"
      >
        Прогнозная аналитика эксгаустеров
      </div>
      <div
        class="mx-1 default-route"
        v-if="$route.name === 'exhauster' || $route.name === 'dashboard'"
      ></div>
      <div
        v-if="$route.name === 'exhauster' || $route.name === 'dashboard'"
        :class="{
          'active-route':
            $route.name === 'exhauster' || $route.name === 'dashboard',
        }"
      >
        / Состояние эксгаустера X-172
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
.nav-bar {
  height: 50px;
  width: 100%;
  background-color: white;
}

.active-route {
  font-weight: 500;
  color: #f57f29;
}

.default-route {
  color: #9e9e9e;
}

.breadcrumbs {
  cursor: pointer;
}
</style>
