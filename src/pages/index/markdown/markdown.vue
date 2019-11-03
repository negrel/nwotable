<template>
  <div id="container">
    <div class="fit bg-white">
      <toolbar />
      <editor class="hack-font" v-if="editMode" v-model="selectedNote.plainNote" />
      <viewer :markdown="selectedNote.markdown" v-else />
    </div>
  </div>
</template>

<script lang="ts">
import toolbar from './toolbar/toolbar.vue';
import editor from './codemirror.vue';
import viewer from './viewer.vue';

import { Note } from 'src/class/Note';

import { Vue, Component, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { debounce } from 'quasar';

@Component({
  components: {
    toolbar,
    editor,
    viewer
  }
})
class Viewer extends Vue {
  @State(state => state.Editor.selectedNote) selectedNote: Note;
  @State(state => state.Editor.editMode) editMode: boolean;

  @Watch('selectedNote.plainNote')
  onSelectedNoteChange = debounce(() => {
    this.$store.dispatch('updateNote');
  }, 5000);
};

export default Viewer;
</script>
