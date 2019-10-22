<template>
  <q-list class="text-grey-1 tag-list">
    <div v-for="tag in tags" :key="tag.fullName">
      <q-item clickable active-class="active-filter">
        <q-item-section avatar />
        <q-item-section>
          <q-item-label>
            <q-icon name="keyboard_arrow_down" v-if="childrenOf(tag).length > 0" />
            {{ tag.name }}
          </q-item-label>
          <q-item-label class="text-grey-5 text-right counter" caption>
            <!-- {{ counter(tag) }} -->
            1
          </q-item-label>
        </q-item-section>
      </q-item>
      <tagList :tags="childrenOf(tag)" v-if="childrenOf(tag).length > 0" />
    </div>
  </q-list>
</template>

<script>
export default {
  name: 'tagList',
  props: {
    tags: Array
  },
  methods: {
    childrenOf(tag) {
      return this.allTags.filter(
        el => el.hasParentTag && el.parent.fullName === tag.fullName
      );
    },
    async counter(tag) {
      const res = await this.$store.dispatch('tagMatchCounter', tag);
      return res;
    }
  },
  computed: {
    allTags() {
      return this.$store.state.Notes.tagList;
    }
  }
};
</script>

<style lang="stylus" scoped>
.tag-list {
  height fit-content
  overflow hidden
  padding-left 0px
  margin-left 1em

  & .q-item__label {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

div {
  height: fit-content;
}
</style>
