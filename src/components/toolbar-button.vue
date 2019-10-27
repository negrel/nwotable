<template>
  <button :class="{ 'btn': true, 'text-primary': active }"
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
.btn {
  & i {
    font-size 1.2em
    justify-content center
    align-items center
  }
}
</style>
