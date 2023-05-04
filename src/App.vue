<template lang="pug">
navbar-component(v-if="requiresAuth")
router-view
</template>

<script>
import { RouterView, useRoute } from 'vue-router';
import NavbarComponent from './components/NavbarComponent.vue';
import { computed } from 'vue';

export default {
  components: {
    NavbarComponent,
    RouterView
  },
  
  setup() {
    const route = useRoute();
    const requiresAuth = computed(() => {
      return route.matched.some(record => record.meta.requiresAuth);
    });

    return {
      requiresAuth,
    };
  },
};
</script>

<style lang="scss" scoped></style>
