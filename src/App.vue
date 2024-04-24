<template>
  <div>
    <nav class="mobile-paddings">
      <div class="display-flexs pc-widths">
        <RouterLink to="/">
          <p class="underlines">Minigame</p>
        </RouterLink>
        <p v-if="$route.name">></p>
        <p v-if="$route.name">{{ $route.name }}</p>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
console.log("path.1");

export default {
  name: 'App',
  components: {
  },
}
</script>

<style>
nav {
  background: black;
  color: #fff;
}
</style>
