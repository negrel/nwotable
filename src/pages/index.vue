<template>
  <q-layout>
    <drawer />
    <mainSection />
    <div class="dragger" id="dragger-viewer"/>
    <viewer />
  </q-layout>
</template>

<script>
import drawer from '../layouts/drawer.vue';
import mainSection from '../layouts/main.vue';
import viewer from '../layouts/viewer.vue';

export default {
  components: {
    drawer,
    mainSection,
    viewer
  }
};
</script>
