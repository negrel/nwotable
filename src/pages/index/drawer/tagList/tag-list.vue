<template>
  <q-list class="text-grey-1 tag-list">
    <div v-for="tag in tags" :key="tag.fullName">
      <q-item clickable
        active-class="active-filter"
        :active="filter === tag.fullName"
        @click="setFilter(tag.fullName)"
      >
        <q-item-section>
          <q-item-label>
            <q-icon name="keyboard_arrow_right"
              :class="{ 'transparent': childrenOf(tag).length === 0, 'rotate-90': showChildren }"
              @click="showChildren = !showChildren"
            />
              {{ tag.name }}
          </q-item-label>
          <q-item-label class="text-grey-5 text-right float-right" caption>
            <!-- {{ counter(tag) }} -->
            1
          </q-item-label>
        </q-item-section>
      </q-item>
      <tagList :tags="childrenOf(tag)" v-if="showChildren" />
    </div>
  </q-list>
</template>

<script>
export default {
  name: 'tagList',
  props: {
    tags: Array
  },
  data: () => ({
    showChildren: true
  }),
  methods: {
    childrenOf(tag) {
      return this.allTags.filter(
        el => el.hasParentTag && el.parent.fullName === tag.fullName
      );
    },
    async counter(tagName) {
      const res = await this.$store.dispatch('tagMatchCounter', tagName);
      return res;
    },
    setFilter(tagName) {
      this.$store.dispatch('setFilter', tagName);
    }
  },
  computed: {
    allTags() {
      return this.$store.state.Notes.tagList;
    },
    filter() {
      return this.$store.state.Filters.filter;
    }
  }
};
</script>

<style lang="stylus" scoped>
.transparent {
  color rgba(0, 0, 0, 0)
}

.tag-list {
  height fit-content
  overflow hidden
  padding-left 0px
  margin-left 1em

  & .q-item {
    width inherit

    &__label {
      max-width fit-content
      text-overflow ellipsis
    }
  }
}
</style>
