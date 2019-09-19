<template>
  <div id="container">
    <div id="editor" v-html="plainNote" contenteditable="true"
      @keydown="debounceSave"
      v-if="editMode"
    >
    </div>
    <div id="viewer" v-html="selectedNote.markdown" contenteditable="false" v-else>
    </div>
      <!-- TODO add highlighting for markdown -->
  </div>
</template>

<script lang="ts">
import { Note } from '../class/Note';

import { debounce } from 'lodash';

import Vue from 'vue';
import { Prop, Component, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
class Editor extends Vue {
  @State(state => state.Editor.selectedNote) selectedNote: Note;
  @Prop(Boolean) readonly editMode: boolean
  public plainNote: string

  @Watch('editMode')
  onEditModeChange(val: boolean) {
    if (val) {
      this.plainNote = this.selectedNote.plainNote;
    } else {
      this.saveNote();
    }
  }

  @Watch('selectedNote')
  onSelectedNoteChange(val: Note, oldVal: Note) {
    if (oldVal.data.meta.created !== val.data.meta.created) {
      this.plainNote = this.selectedNote.plainNote;
      // TODO Fix bug when edit mode + create new note
    }
    console.log('YAYAY');
  }

  saveNote() {
    let editor = document.querySelector('#editor');
    if (editor) {
      this.selectedNote.markdown = editor.innerHTML;
    }
    this.$store.dispatch('saveNote');
  }

  public debounceSave = debounce(() => {
    this.saveNote();
  }, 1000)
};

export default Editor;
</script>
