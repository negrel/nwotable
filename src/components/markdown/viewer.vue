<template>
  <div id="viewer" v-html="selectedNote.markdown" contenteditable="false" >
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { Note } from '../../class/Note';

@Component
class Viewer extends Vue {
  @State(state => state.Editor.selectedNote) selectedNote: Note;
};

export default Viewer;
</script>

<style lang="stylus" scoped>
// See markd.styl for markdown css rules
#viewer {
  padding-top 1em
  padding-left 1em
  height 100%
  overflow-y auto
  font-size 1.3em
  font-weight 400

  & * {
    max-width 99%
  }
}
</style>
