<template>
  <div class="text-field">
    <input type="text"
      @change="change"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      @keypress="keyPress"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    ariaLabel: String
  },
  methods: {
    change(newVal) {
      this.$emit('change', newVal);
    },
    keyPress(event) {
      this.$emit('keypress', event);
    }
  }
};
</script>

<style lang="stylus" scoped>
.text-field {
  display flex
  flex 1
  border 2px solid $grey-4
  border-radius 5px
  overflow hidden
  padding .1em .5em 0em .5em
  background-color white
  transition: .15s ease-in-out

  & input[type=text] {
    flex 1
    min-width 10px
  }

  &:focus-within {
    border 2px solid $primary
  }

  & * {
    border none
    outline none
    color black
    background-color white
  }
}
</style>
