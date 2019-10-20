<template>
  <div>
    <q-list class="text-grey-1 drawer-list">
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
        :active="filter !== 'favorited' && filter !== 'all'"
      >
        <q-item-section avatar>
          <q-icon name="local_offer" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Tags</q-item-label>
        </q-item-section>
        <q-icon name="keyboard_arrow_down" />
      </q-item>
      <tagList />
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

import tagList from './tagList/tag-list.vue';
import showMoreBtn from './tagList/show-more-btn.vue';

@Component({
  components: {
    tagList,
    showMoreBtn
  }
})
class Drawer extends Vue {
  @State(state => state.Notes.noteList.length) noteCount: number
  @State(state => state.Filters.favorited) favCount: number
  @State(state => state.Filters.filter) filter: string

  dispatchFilter(filter: string): void {
    this.$store.dispatch('setFilter', filter);
  }
};

export default Drawer;
</script>

<style lang="stylus">
.drawer-list {
  height 100vh
  flex 10
  display inline-block
  max-width 216px

  & > * {
    max-width 216px
  }

  & > .q-item {
    word-break keep-all
    width 100vw

    &:hover {
      background-color: #00000030
    }
  }

  & .active-filter {
    color: inherit
    background-color: #00000050!important
  }
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

#github {
  position fixed
  bottom 0
  left 0
}
</style>
