<template>
  <div id="btnSnippet" @mouseenter="showSnippet" @mouseleave="hideSnippet">
    <slot name="button"></slot>
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
  }),
  methods: {
    showSnippet() {
      this.snippet = true;
    },
    hideSnippet() {
      this.snippet = false;
    }
  }
};
</script>

<style lang="stylus">
#btnSnippet {
  display inline-block

  & .snippet {
    border-radius 10px
    width max-content
    position fixed
    z-index 100
    color white
    transform translate(-50%, 0)
    font-size: 1.2em

    & * > button {
      margin 0
      display inline-block
    }
  }
}

</style>
