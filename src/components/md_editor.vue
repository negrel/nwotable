<template>
  <div id="md-editor" contenteditable="true">
    {{ note.body }}
  </div>
</template>

<script>
export default {
  props: ['note']
};
</script>
