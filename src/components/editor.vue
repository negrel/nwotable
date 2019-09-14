<template>
  <div id="editor" v-html="note">
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
      return this.noteObject.markdown;
    } else {
      return this.noteObject.parsedNote;
    }
  }
};

export default Editor;
</script>
