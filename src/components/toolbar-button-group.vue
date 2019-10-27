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
  max-height 3vh

  & .btn {
    border-radius 0px
    border-left-width .5px
    border-right-width .5px
    border-top-width 1px
    border-bottom-width 1px
  }

  & .btn:first-child {
    border-right-width .5px
    border-radius 5px
    border-top-right-radius 0px
    border-bottom-right-radius 0px
  }

  & > .btn:last-child {
    border-left-width .5px
    border-radius 5px
    border-top-left-radius 0px
    border-bottom-left-radius 0px
    margin-right .5em
  }

}

</style>
