<template>
  <codemirror
    :options="{
      mode: 'markdown',
      indentWithTabs: true,
      lineWrapping: true,
      extraKeys: {
        'Ctrl-Space': 'autocomplete',
        'Ctrl-S': save,
        'Ctrl-E': viewMode,
        'Ctrl-D': downloadNote,
      },
      autofocus: true,
      theme: 'nwotable',
    }"
    id="editor"
    v-model="plainNote"
    @input="save"
    ref="mdEditor"
  >
  </codemirror>
</template>

<script>
import Vue from 'vue';
import { Prop, Component, Watch } from 'vue-property-decorator';

import { debounce } from 'quasar';

import { codemirror } from 'vue-codemirror-lite';
require('codemirror/mode/markdown/markdown');

export default {
  components: {
    codemirror
  },
  data: () => ({
    plainNote: String
  }),
  props: {
    value: String
  },
  watch: {
    value: function(val) {
      this.plainNote = val.substring(0);
    }
  },
  created() {
    // Cloning prop to avoid mutating prop
    this.plainNote = this.value.substring(0);
    this.save = debounce(this.save, 500);
  },
  methods: {
    save() {
      this.$emit('input', this.plainNote);
      this.$store.dispatch('updateNote');
    },
    viewMode() {
      this.$store.dispatch('setEditMode', false);
    },
    downloadNote() {
      const note = this.$store.state.Editor.selectedNote;
      note.download();
    }
  },
  computed: {
    editor() {
      // get current editor object
      return this.$refs.mdEditor.editor;
    }
  }
};
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
  height 96vh
  font-size 1em
  font-weight 300
  overflow hidden

  & * {
    transition .1s ease-in-out
    color #333
  }
}
</style>
