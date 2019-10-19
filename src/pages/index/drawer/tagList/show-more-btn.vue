<template>
  <button
    :class="{ 'rotate-90': show, 'moreBtn': true }"
    title="Show more"
    @click="show = !show"
  >
    <q-icon name="keyboard_arrow_right" />
  </button>
</template>

<script>
export default {
  data: () => ({
    show: false
  })
};
</script>

<style lang="stylus" scoped>
.moreBtn {
  flex 0
  background-color rgba(0, 0, 0, 0)
  color white
  border none
  border-radius 100em
  outline none

  &:hover {
    background-color #00000030
  }

  &:active {
    background-color #00000050
  }
}
</style>
