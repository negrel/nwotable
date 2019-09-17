<template>
  <div id="editor" v-html="note" :contenteditable="editMode">
  </div>
</template>

<script lang="ts">
import { Note } from '../class/Note';

import { debounce } from 'lodash';

import Vue from 'vue';
import { Prop, Component, Watch } from 'vue-property-decorator';

@Component
class Editor extends Vue {
  @Prop(Boolean) readonly editMode: boolean
  @Prop(Note) readonly noteObject: Note

  @Watch('editMode')
  onEditModeChange(val: boolean) {
    if (val) {
      console.log(this.noteObject.plainNote);
    }
  }

  get note() {
    if (this.editMode) {
      return this.noteObject.plainNote;
    } else {
      return this.noteObject.markdown;
    }
  }

  public saveNote = debounce(() => {
    let editor = document.querySelector('#editor');
    if (editor) {
      this.noteObject.markdown = editor.innerHTML;
    }
    this.$store.dispatch('saveNote');
  }, 350)
};

export default Editor;
</script>
