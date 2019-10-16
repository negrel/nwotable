<template>
  <div id="btnSnippet" >
    <div @click="snippet = !snippet">
      <slot name="button"></slot>
    </div>
    <transition name="fade">
      <div class="snippet shadow-3" v-if="snippet">
        <slot name="body"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    snippet: false
  })
};
</script>

<style lang="stylus">
#btnSnippet {
  display inline-block

  & .snippet {
    border-radius 10px
    width fit-content
    position fixed
    z-index 10
    color white
    transform translate(-50%, 0)
    font-size: 1.2em

    & * > button {
      margin 0
    }
  }
}

</style>
