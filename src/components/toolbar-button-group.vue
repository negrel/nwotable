<template>
  <div class="group">
    <slot></slot>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="stylus" scoped>
  .group * {
    border-radius 0px
    border-left-width .5px
    border-right-width .5px

    &:first-child {
      border-top-left-radius 5px
      border-bottom-left-radius 5px
      margin-right 0px
    }

    &:last-child {
      border-top-right-radius 5px
      border-bottom-right-radius 5px
      margin-left 0px
      margin-right: 1em
    }
  }
</style>
