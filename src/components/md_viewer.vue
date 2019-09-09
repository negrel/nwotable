<template>
  <div id="md-viewer" v-html="parsedNote"></div>
</template>

<script>
import marked from 'marked';

export default {
  props: ['note'],
  computed: {
    parsedNote() {
      if (this.note.body) {
        return marked(this.note.body);
      }
      return '';
    }
  }
};
</script>
