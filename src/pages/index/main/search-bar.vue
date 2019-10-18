<template>
  <textField
    class="search-field"
    placeholder="Search..."
    aria-label="search-field"
    @change="fuzzySearch"
  >
    <div class="float-right">
      <q-icon name="search" />
    </div>
  </textField>
</template>

<script lang='ts'>
import textField from 'src/components/text-field.vue';

import { Note } from 'src/class/Note';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component({
  components: {
    textField
  }
})
class SearchBar extends Vue {
  @State(state => state.NoteList.noteList) noteList: Note[];

  fuzzySearch(val: string) {
    console.log('searching: ', val);
  }
};

export default SearchBar;
</script>

<style lang="stylus" scoped>
.search-field {
  margin-right 1em
}
</style>
