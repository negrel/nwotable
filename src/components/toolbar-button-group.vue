<template>
  <div class="group">
    <slot></slot>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="stylus">
.group {
  border-radius 0px

  & .btn-toolbar {
    border-left-width .5px
    border-right-width .5px
    border-radius 0px
  }

  & .btn-toolbar:last-child {
    border-right-width 1px
    border-radius 5px
    border-top-left-radius 0px
    border-bottom-left-radius 0px
    margin-left 0px
    margin-right: 1em
  }

  & .btn-toolbar:first-child {
    border-left-width 1px
    border-radius 5px
    border-top-right-radius 0px
    border-bottom-right-radius 0px
    margin-right 0px
  }
}

</style>
