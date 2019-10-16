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
import drawer from '../pages/index/drawer/drawer.vue';
import mainSection from '../pages/index/main/main.vue';
import viewer from '../pages/index/markdown/markdown.vue';

import Vue from 'vue';
import Component from 'vue-class-component';
import { Multipane, MultipaneResizer } from 'vue-multipane';

import hotkeys from 'hotkeys-js';

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
  },
  created() {
    const store = this.$store;

    // Switch edit mode
    hotkeys('ctrl+e', (event, handler) => {
      event.preventDefault();

      const editMode = store.state.Editor.editMode;
      store.dispatch('setEditMode', !editMode);
    });

    // Save the note
    hotkeys('ctrl+s', (event, handler) => {
      event.preventDefault();

      const editMode = store.state.Editor.editMode;

      if (editMode) {
        store.dispatch('updateNote');
      }
    });

    // Download the note
    hotkeys('ctrl+d', (event, handler) => {
      event.preventDefault();

      store.state.Editor.selectedNote.download();
    });

    // Add a new note.
    hotkeys('shift+n', (event, handler) => {
      event.preventDefault();
      store.dispatch('addNote');
    });

    // Next note.
    hotkeys('shift+tab', (event, handler) => {
      event.preventDefault();

      store.dispatch('selectNextNote');
    });

    // Previous note.
    hotkeys('shift+w+tab', (event, handler) => {
      event.preventDefault();

      store.dispatch('selectPreviousNote');
    });
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
