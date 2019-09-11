<template>
  <div id="md-editor" contenteditable="true">
    {{ note.body }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component
class MdEditor extends Vue {
  @Prop({ default: '# No note.' })
  note: string
};

export default MdEditor;
</script>
