<template>
  <q-list v-if="rootTags.length > 0"
    class="text-grey-1 drawer-list"
  >
    <q-item v-for="tag in rootTags"
      :key="tag.fullName"
      clickable
    >
      <!-- <childrenTag :parent="tag"> -->
    </q-item>
  </q-list>
</template>

<script>
// import childrenTag from './children-tag-list';

export default {
  components: {
    // childrenTag
  },
  computed: {
    rootTags() {
      return this.tags.filter(tag => !tag.hasParentTag);
    },
    tags() {
      return this.$store.state.Notes.tagList;
    }
  }
};
</script>

<style lang="stylus" scoped>
.tagIcon {
  font-size .5em
}
</style>
