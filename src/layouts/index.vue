<template>
  <q-layout>
    <drawer />
    <mainSection />
    <div class="dragger" id="dragger-viewer"/>
    <viewer />
  </q-layout>
</template>

<script>
import drawer from '../pages/index/drawer.vue';
import mainSection from '../pages/index/main.vue';
import viewer from '../pages/index/viewer.vue';

export default {
  components: {
    drawer,
    mainSection,
    viewer
  },
  mounted() {
    this.$store.dispatch('initDb');
  }
};
</script>
