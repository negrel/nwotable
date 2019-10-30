<template>
  <div id="viewer" v-html="markdown" contenteditable="false" >
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { Note } from 'src/class/Note';

@Component
class Viewer extends Vue {
  @Prop({ default: '' })
  markdown: string
};

export default Viewer;
</script>

<style lang="stylus" scoped>
@import '../../../css/functions.styl'
@import '../../../css/quasar.variables.styl'

// See markd.styl for markdown css rules
#viewer {
  padding-top 1em
  padding-left 1em
  height 100%
  overflow-y auto
  text-user-select()

  & * {
    max-width 99%
  }

  ::selection {
    background-color #ef6c0026
  }
}
</style>
