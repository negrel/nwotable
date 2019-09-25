<template>
	<div id="search-field" class="fit">
		<input type="text" placeholder="Search..." @change="fuzzySearch"/>
		<toolbarButton :icons="['search']" class="float-right" />
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
  @Prop({ default: false })
  compact: boolean

  @State(state => state.NoteList.noteList) noteList: Note[];
};

export default SearchBar;
</script>

<style lang="stylus" scoped>
  #search-field {
    border $header-border
    border-radius 5px
    overflow hidden
    padding .1em .5em
    margin-right 1em
    background-color white

    & input[type=text] {
      width 85%
    }

    & * {
      border none
      outline none
      color black
      background-color white
    }
  }
</style>
