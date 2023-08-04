<template>
  <div id="app" class="flex flex-col">
    <!-- Show the preloader based on isLoading state -->
    <Preloader v-if="isLoading" />

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
import Preloader from './components/Preloader.vue';

export default {
  name: 'App',
  router,
  components: { RouterView, SidebarMenu, Preloader },
  data() {
    return {
      isLoading: true,
    };
  },
  created() {
    // Add an event listener to show the loader when the window finishes loading
    window.onload = () => {
      this.isLoading = false; // Set isLoading to false after the window finishes loading
    };
  },
};
</script>
