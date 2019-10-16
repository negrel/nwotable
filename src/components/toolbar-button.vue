<template>
  <button :class="{ 'btn-toolbar': true, 'text-primary': active }"
  @click="emitEvent"
  :title="title">
      <q-icon :name="icons[0]" v-if="!active" />
      <q-icon :name="icons[1] || icons[0]" v-else />
  </button>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
class ToolbarButton extends Vue {
  @Prop({ default: () => { return ['search', 'clear']; } })
  icons: string[]

  @Prop({ default: false })
  active: boolean

  @Prop({ default: '' })
  title: string

  emitEvent() {
    this.$emit('click');
  }
};

export default ToolbarButton;
</script>

<style lang="stylus">
  .btn-toolbar {
    margin 0px
    background-color white
    border 1px solid $grey-4
    border-radius 5px
    padding .1em .5em
    outline none
    transition .2s ease-in-out

    &:hover {
      cursor pointer
      background-color $grey-2
    }

    &:active {
      background-color $grey-5
    }

    & i {
      font-size 1.2em
      justify-content center
      align-items center
    }
  }
</style>
