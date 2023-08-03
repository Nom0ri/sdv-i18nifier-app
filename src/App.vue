<template>
  <div id="app" class="flex flex-col">
  <!--  <router-view /> -->
    <DialoguePage />
  </div>
</template>

<script>
import router from './router';
import DialoguePage from './views/DialoguePage.vue';

export default {
    name: 'App',
    router,
    components: { DialoguePage }
};
</script>