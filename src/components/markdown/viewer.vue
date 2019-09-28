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
