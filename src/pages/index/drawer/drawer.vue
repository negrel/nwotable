<template>
  <div class="drawer-list">
    <q-list class="text-grey-1 filter-list">
      <q-item-label header>Menu</q-item-label>
      <q-item clickable
        @click="dispatchFilter('all')"
        active-class="active-filter"
        :active="filter === 'all'"
      >
        <q-item-section avatar>
          <q-icon name="book" />
        </q-item-section>
        <q-item-section>
          <q-item-label>All Notes</q-item-label>
          <q-item-label class="text-grey-5 text-right" caption>
            {{ noteCount }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable
        @click="dispatchFilter('favorited')"
        active-class="active-filter"
        :active="filter === 'favorited'"
      >
        <q-item-section avatar>
          <q-icon name="star" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Favorite</q-item-label>
          <q-item-label class="text-grey-5 text-right" caption>
            {{ favCount }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable
        active-class="active-filter"
        :active="filter !== 'favorited' && filter !== 'all' && !filter.startsWith('search:')"
      >
        <q-item-section avatar>
          <q-icon name="local_offer" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Tags</q-item-label>
          <q-item-label class="text-grey-1 text-right" caption>
            <q-icon name="keyboard_arrow_down"
              :class="{ 'rotate-90': !showTagList }"
              @click="showTagList = !showTagList"
              v-if="rootTags.length > 0"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
      <keep-alive>
        <tagList
          :tags="rootTags"
          class="tagList"
          v-if="showTagList && rootTags.length > 0"
        />
      </keep-alive>
    </q-list>
    <q-list class="text-grey-1">
      <q-item clickable
          tag="a"
          target="_blank"
          href="https://github.com/Nergel3/"
          id="github"
          rel="noopener"
        >
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
          </q-item-section>
        </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { State } from 'vuex-class';

import { Tag } from 'src/class/Tag';
import { Note } from 'src/class/Note';

import tagList from './tag-list.vue';

@Component({
  components: {
    tagList
  }
})
class Drawer extends Vue {
  @State(state => state.Notes.tagList) tags: Tag[]
  @State(state => state.Notes.noteList) noteList: Note[]
  @State(state => state.Filters.favorited) favCount: number
  @State(state => state.Filters.filter) filter: string

  showTagList: boolean

  constructor() {
    super();
    this.showTagList = true;
  }

  dispatchFilter(filter: string): void {
    this.$store.dispatch('setFilter', filter);
  }

  get rootTags(): Tag[] {
    return this.tags.filter((tag: Tag): boolean => !tag.hasParentTag);
  }

  get noteCount(): number {
    return this.noteList.length;
  }
};

export default Drawer;
</script>

<style lang="stylus">
.drawer-list {
  height 100vh

  & > .filter-list {
    flex 10
    display inline-block
    overflow-y auto
    max-height calc(100vh - 2.5em)
    max-width 300px

    & > .tagList {
      overflow auto
      padding-left 4em
      margin-left 0px

      & .q-item {
        min-width 50px
      }
    }

    & * {
      max-width 300px
    }
  }

  & .q-item {
    word-break keep-all
    min-width 300px

    & .q-item__section--side {
      min-width 3em
    }

    &:hover {
      background-color: #00000030
    }
  }

  & .active-filter {
    color: inherit
    background-color: #00000050!important
  }

  .q-item__label--header {
    padding 1em .7em
  }

  & .q-focus-helper {
    background transparent!important

    & * {
      background transparent!important
    }

    &::after, &::before {
      background transparent!important
    }
  }
}

#github {
  position absolute
  bottom 0
  left 0
}
</style>
