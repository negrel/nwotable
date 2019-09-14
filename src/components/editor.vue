<template>
  <div id="editor" v-html="note" :contenteditable="editMode">
  </div>
</template>

<script lang="ts">
import { Note } from '../class/Note';

import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component
class Editor extends Vue {
  @Prop(Boolean) readonly editMode: boolean
  @Prop(Note) readonly noteObject: Note

  public get note(): string {
    if (this.editMode) {
      return this.noteObject.plainNote;
    } else {
      return this.noteObject.markdown;
    }
  }
};

export default Editor;
</script>
