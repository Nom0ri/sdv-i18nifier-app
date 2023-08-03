<template>
  <div id="app" class="flex flex-col">
    <div class="container">
      <div class="sidebar">
        <SidebarMenu />
      </div>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import router from './router';
import SidebarMenu from './components/SidebarMenu.vue';

export default {
    name: 'App',
    router,
    components: { RouterView, SidebarMenu }
};
</script>