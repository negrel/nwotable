<template>
	<div class="search-field">
		<input type="text"
      placeholder="Search..."
      @change="fuzzySearch"
    />
    <div class="float-right">
      <q-icon name="search" />
    </div>
	</div>
</template>

<script lang='ts'>
import toolbarButton from './toolbar-button.vue';

import { Note } from '../class/Note';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component({
  components: {
    toolbarButton
  }
})
class SearchBar extends Vue {
  @State(state => state.NoteList.noteList) noteList: Note[];

  fuzzySearch() {
    console.log('searching...');
  }
};

export default SearchBar;
</script>

<style lang="stylus" scoped>

  .search-field {
    display flex
    flex 1
    border 1px solid $grey-4
    border-radius 5px
    overflow hidden
    padding .1em .5em 0em .5em
    margin-right 1em
    background-color white

    & input[type=text] {
      flex 1
    }

    & * {
      border none
      outline none
      color black
      background-color white
    }
  }
</style>
