<template>
  <codemirror
    :options="{
      mode: 'markdown',
      extraKeys: {'Ctrl-Space': 'autocomplete'},
      indentWithTabs: true,
      lineWrapping: true
    }"
    id="editor"
    v-model="plainNote"
    @input="debounceSave"
  >
  </codemirror>
</template>

<script>
import Vue from 'vue';
import { Prop, Component, Watch } from 'vue-property-decorator';

import { debounce } from 'lodash';

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
    plainNote: function(val) {
      this.plainNote = val.substring(0);
    }
  },
  created() {
    // Cloning prop to avoid mutating prop
    this.plainNote = this.value.substring(0);
  },
  methods: {
    debounceSave: debounce(function() {
      this.save();
    }, 1000),
    save() {
      this.$emit('input', this.plainNote);
      this.$store.dispatch('updateNote');
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
