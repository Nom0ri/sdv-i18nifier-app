<template>
  <div id="app" class="flex flex-col">
    <div class="container">
      <div class="sidebar">
        <SidebarMenu />
      </div>
      <div class="content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import router from './router';
import DialoguePage from './views/DialoguePage.vue';
import SidebarMenu from './components/SidebarMenu.vue';

export default {
    name: 'App',
    router,
    components: { DialoguePage, RouterView, SidebarMenu }
};
</script>