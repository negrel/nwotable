<template>
  <textarea id="editor"
    @keydown="debounceSave"
    v-model="plainNote"
  >
  </textarea>
  <!-- TODO add highlighting for markdown -->
</template>

<script lang="ts">
import { Note } from '../../class/Note';

import { debounce } from 'lodash';

import Vue from 'vue';
import { Prop, Component, Watch } from 'vue-property-decorator';

@Component
class Editor extends Vue {
  @Prop({ default: '' })
  value: string

  plainNote: string

  @Watch('value')
  onValueChange(val: string): void {
    this.plainNote = val.substring(0);
  }

  created() {
    // Cloning prop to avoid mutating prop
    this.plainNote = this.value.substring(0);
  }

  save() {
    this.$emit('input', this.plainNote);
    this.$store.dispatch('updateNote');
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
  height 96vh
  font-size 1em
  font-weight 300
  overflow-y scroll

  & * {
    transition .1s ease-in-out
    color #333
  }
}
</style>
