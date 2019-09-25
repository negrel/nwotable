<template>
  <q-layout>
    <multipane class="vertical-panes" layout="vertical">
      <div class="pane" id="drawer">
        <drawer />
      </div>
      <multipane-resizer></multipane-resizer>
      <div class="pane" id="main">
        <mainSection />
      </div>
      <multipane-resizer></multipane-resizer>
      <div class="pane" id="markdown">
        <div>
          <viewer />
        </div>
      </div>
    </multipane>
  </q-layout>
</template>

<script>
import drawer from '../pages/index/drawer.vue';
import mainSection from '../pages/index/main.vue';
import viewer from '../pages/index/markdown.vue';

import Vue from 'vue';
import Component from 'vue-class-component';
import { Multipane, MultipaneResizer } from 'vue-multipane';

export default {
  components: {
    Multipane,
    MultipaneResizer,
    drawer,
    mainSection,
    viewer
  },
  mounted() {
    this.$store.dispatch('init');
  }
};
</script>
