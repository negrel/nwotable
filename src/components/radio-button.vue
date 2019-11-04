<template>
  <div :class="{ 'row': true, 'inline': true, 'radio-container': true, 'disable': disable }">
    <div class="radio-button cursor-pointer relative-position" @click="input">
      <div :class="{ 'circle': true, 'absolute': true, 'bg-apple-blue': active }">
        <div class="inner-circle" v-if="active" />
      </div>
    </div>
    <div class="label cursor-pointer" @click="input">{{ label }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    val: String,
    label: String,
    disable: Boolean
  },
  methods: {
    input() {
      if (!this.disable) {
        this.$emit('input', this.val);
      }
    }
  },
  computed: {
    active() {
      return this.value === this.val;
    }
  }
};
</script>

<style lang="stylus" scoped>
& .disable {
  & .bg-apple-blue {
    background-color $grey-6!important
  }

  & .label {
    color $grey-6
  }
}

.radio-container {
  margin-left .5em

  & * {
    display inline-block
  }

  & .label {
    margin: auto .5em
  }

  .radio-button {
    outline none
    width 1rem
    height 1rem
    margin auto 0

    & > .circle {
      width 100%
      height 100%
      margin 0
      border 1px solid $grey-5
      border-radius 20em
      box-shadow inset 0px 2px 3px -3px rgba(0,0,0,0.75)

      & > .inner-circle {
        width 40%
        height 40%
        background-color $grey-2
        border-radius 20em
        position absolute
        left 50%
        top 50%
        -webkit-transform translate(-50%, -50%)
        transform translate(-50%, -50%)
        box-shadow .5px .75px 2px -.5px rgba(0,0,0,1)
      }
    }
  }

}
</style>
