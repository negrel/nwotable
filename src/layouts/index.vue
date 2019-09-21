<template>
  <q-layout>
    <drawer />
    <mainSection />
    <div class="dragger" id="dragger-viewer"/>
    <viewer />
  </q-layout>
</template>

<script lang="ts">
import drawer from '../pages/index/drawer.vue';
import mainSection from '../pages/index/main.vue';
import viewer from '../pages/index/viewer.vue';

import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  components: {
    drawer,
    mainSection,
    viewer
  }
})
class Index extends Vue {
  mounted() {
    this.$store.dispatch('init');
  }
};

export default Index;
</script>
