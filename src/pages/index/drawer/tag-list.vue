<template>
  <q-list class="text-grey-1 tag-list">
    <div v-for="[key, tag] in Object.entries(tags)" :key="tag.fullName">
      <q-item clickable
        active-class="active-filter"
        :active="filter === tag.fullName"
        @click="setFilter(tag.fullName)"
      >
        <q-item-section>
          <q-item-label>
            <q-icon name="keyboard_arrow_right"
              :class="{ 'rotate-90': showChildren[key] }"
              @click="toggleChildren(key)"
              v-if="childrenOf(tag).length > 0"
            />
              {{ tag.name }}
          </q-item-label>
          <q-item-label class="text-grey-5 text-right float-right" caption>
            {{ counter(tag.fullName) }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <tagList :tags="childrenOf(tag)" v-if="showChildren[key]" />
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
    showChildren: []
  }),
  mounted() {
    for (let i = 0, length = this.tags.length; i < length; i++) {
      this.showChildren[i] = false;
    }
  },
  methods: {
    childrenOf(tag) {
      return this.allTags.filter(
        el => el.hasParentTag && el.parent.fullName === tag.fullName
      );
    },
    toggleChildren(key) {
      this.showChildren[key] = !this.showChildren[key];
      // Replacing the entire array to detect change.
      this.showChildren = [...this.showChildren];
    },
    counter(tagName) {
      const noteList = this.$store.state.Notes.noteList;
      let counter = 0;
      noteList.forEach((note) => {
        if (note.match(tagName)) {
          counter++;
        }
      });
      return counter;
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
