<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="stylus">
.card {
  padding 1em
  background linear-gradient(0deg, $grey-3 0%, $grey-1 100%)
  color $secondary
}
</style>
