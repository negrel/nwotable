<template>
  <textarea id="editor"
    @keydown="debounceSave"
    :value="value"
  >
  </textarea>
  <!-- TODO add highlighting for markdown -->
</template>

<script lang="ts">
import { Note } from '../../class/Note';

import { debounce } from 'lodash';

import Vue from 'vue';
import { Prop, Component, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
class Editor extends Vue {
  @Prop({ default: '' })
  value: string

  @State(state => state.Editor.selectedNote) selectedNote: Note;

  // @Watch('selectedNote')
  // onSelectedNoteChange(val: Note, oldVal: Note) {
  //   if (oldVal.data.meta.created !== val.data.meta.created) {
  //     this.plainNote = this.selectedNote.plainNote;
  //     // TODO Fix bug when edit mode + create new note
  //   }
  // }

  save() {
    this.$emit('input', this.value);
  }

  public debounceSave = debounce(() => {
    this.save();
  }, 1000)
};

export default Editor;
</script>

<style lang="stylus" scoped>
#editor {
  padding-left 1em
  background-color $grey-2
  color $secondary
  padding-top 1em
  outline none
  width 100%
  height 100%
  box-sizing border-box
  border none
  resize none
  height 97vh
  font-size 1em
  font-weight 300

  & * {
    transition .1s ease-in-out
    color #333
  }
}
</style>
