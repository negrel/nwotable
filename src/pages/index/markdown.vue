<template>
  <div id="container">
    <div class="fit bg-white">
      <toolbar />
      <editor class="hack-font" v-if="editMode" v-model="selectedNote.plainNote" />
      <viewer v-else />
    </div>
  </div>
</template>

<script lang="ts">
import toolbar from '../../components/markdown/toolbar.vue';
import editor from '../../components/markdown/editor.vue';
import viewer from '../../components/markdown/viewer.vue';

import { Note } from '../../class/Note';

import { Vue, Component, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';

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

  @Watch('editMode')
  onEditModeChange(val: boolean) {
    if (!val) {
      this.saveNote();
    }
  }

  saveNote() {
    let editor = document.getElementById('editor') as HTMLInputElement;
    if (editor) {
      this.selectedNote.plainNote = editor.value;
    }
    this.$store.dispatch('saveNote');
  }
};

export default Viewer;
</script>
