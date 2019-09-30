<template>
  <div id="viewer" v-html="markdown" contenteditable="false" >
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { Note } from '../../class/Note';

@Component
class Viewer extends Vue {
  @Prop({ default: '' })
  markdown: string
};

export default Viewer;
</script>

<style lang="stylus" scoped>
@import '../../css/functions.styl'
@import '../../css/quasar.variables.styl'

// See markd.styl for markdown css rules
#viewer {
  padding-left 1em
  height 100%
  overflow-y auto
  text-user-select()

  // Scroll bar
  &::-webkit-scrollbar {
    width .5em
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background-color $grey-1;
    border-radius: 1000px
    box-shadow inset 0 0 3px $grey-6

    &:hover {
      width 10px
    }
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background-color $grey-5;
    border-radius: 1000px

    /* Handle on hover */
    &:hover {
      width 12px
      background-color $grey-6;
    }
  }

  & * {
    max-width 99%
  }

  ::selection {
    background-color #ef6c0026
  }
}
</style>
