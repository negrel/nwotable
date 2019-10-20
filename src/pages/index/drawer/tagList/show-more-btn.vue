<template>
  <button
    class="moreBtn"
    title="Show more"
    @click="click"
  >
    <q-icon name="keyboard_arrow_right" :class="{ 'rotate-90': show }"/>
  </button>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  methods: {
    click() {
      // this.$emit('click');
      console.log(this.show);
    }
  }
};
</script>

<style lang="stylus" scoped>
.moreBtn {
  padding 0px
  flex 0
  background-color rgba(0, 0, 0, 0)
  color white
  border none
  border-radius 100em
  outline none
  transition .5s ease-in-out

  &:hover {
    cursor pointer
  }
}
</style>
