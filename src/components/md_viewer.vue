<template>
  <div id="md-viewer" v-html="parsedNote"></div>
</template>

<script lang="ts">
const marked = require('marked');

import { Note } from '../types';

import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component
class MdViewer extends Vue {
  @Prop({
    default: {
      body: '# Default note.',
      lastEdit: new Date(),
      label: false,
      favorite: false,
      pin: false
    }
  })
  note: Note

  get parsedNote(): string {
    if (this.note.body) {
      return marked(this.note.body);
    }
    return '';
  }
};

export default MdViewer;
</script>
