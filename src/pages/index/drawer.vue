<template>
  <div>
    <q-list class="text-grey-1">
      <q-item-label header>Menu</q-item-label>
      <q-item clickable @click="dispatchFilter('all')">
        <q-item-section avatar>
          <q-icon name="book" />
        </q-item-section>
        <q-item-section>
          <q-item-label>All Notes</q-item-label>
          <q-item-label class="text-grey-5" caption>
            <!-- TODO Insert number of notes -->
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable @click="dispatchFilter('favorited')">
        <q-item-section avatar>
          <q-icon name="star" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Favorite</q-item-label>
          <q-item-label class="text-grey-5" caption></q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="local_offer" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Tags</q-item-label>
          <q-item-label class="text-grey-5" caption></q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable
        tag="a"
        target="_blank"
        href="https://github.com/Nergel3/"
        id="github"
      >
        <q-item-section avatar>
          <q-icon name="code" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Github</q-item-label>
          <!-- <q-item-label class="text-grey-5" caption>github.com/Nergel3</q-item-label> -->
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
class Drawer extends Vue {
  dispatchFilter(filter: string): void {
    this.$store.dispatch('setFilter', filter);
  }
};

export default Drawer;
</script>

<style lang="stylus" scoped>
.q-list {
  height 100vh
  flex 10
  display inline-block

  & .q-item {
    word-break keep-all
    width 100vw

    &:hover {
      background #181c1fbf
    }
  }

  & .q-focusablehover {
    background #00000020
  }
}

.q-item__label--header {
  padding 1em .7em
}

& .q-focus-helper {
  background transparent

  &:hover {
    background rgba(0,0,0,1)!important
  }

  &:active {
    background rgba(0,0,0,1)
  }

  &:after {
    background rgba(0,0,0,1)
    opacity 1
  }
}

#github {
  position fixed
  bottom 0
  left 0
}
</style>
