<template>
  <main>
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
  </main>
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

<style lang="stylus" scoped>
#drawer {
  min-width 56px
  max-width 216px
  overflow-y auto
  overflow-x hidden
  word-break keep-all
  background rgb(32,39,44)
}

#main {
  width 300px
  min-width 250px
  max-width 500px
  z-index 1
}

#markdown {
  min-width 335px
  flex 1
}
</style>
