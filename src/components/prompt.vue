<template>
  <div class="prompt absolute-center shadow-15">
    <h5>
      {{ header }}
    </h5>
    <slot>
    </slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
class Prompt extends Vue {
  @Prop({ default: '' })
  header: string;
}

export default Prompt;
</script>

<style lang="stylus">
.prompt {
  position fixed
  top 50
  left 50
  transform translate(-50%, -50%)
  background linear-gradient(0deg, $grey-2 0%, $grey-1 100%);
  color $secondary
  padding 1em;
  border-radius 1em
  min-width 25rem

  h5 {
    margin-top 0px
  }
}
</style>
