<template>
  <div class="prompt">
    <slot></slot>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="stylus">
.prompt {
  padding 1em
  background linear-gradient(0deg, $grey-4 0%, $grey-1 100%)
  color $secondary
}
</style>
