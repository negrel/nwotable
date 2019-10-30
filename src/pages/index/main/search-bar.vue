<template>
  <textField
    class="search-field"
    placeholder="Search..."
    aria-label="search-field"
    v-model="search"
  >
    <div class="float-right">
      <q-icon name="search" />
    </div>
  </textField>
</template>

<script lang='ts'>
import textField from 'src/components/text-field.vue';

import { Note } from 'src/class/Note';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { debounce } from 'quasar';

@Component({
  components: {
    textField
  }
})
class SearchBar extends Vue {
  @State(state => state.Notes.noteList) noteList: Note[];
  @State(state => state.Filters.filtredList) filtredList: number[];
  search: string;
  fuzzy: [][];

  constructor() {
    super();
    this.search = '';
  }

  get filtredNote() {
    const sample = [];
    for (let i = 0, length = this.filtredList.length; i < length; i++) {
      sample.push(this.noteList[this.filtredList[i]]);
    }
    return sample;
  }

  @Watch('search')
  onSearchChange = debounce(this.fuzzySearch, 500);

  fuzzySearch(val: string) {
    this.$store.dispatch('setFilter', 'search:' + val);
  }
};

export default SearchBar;
</script>

<style lang="stylus" scoped>
.search-field {
  margin-right 1em
}
</style>
