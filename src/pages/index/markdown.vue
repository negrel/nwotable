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
import toolbar from '../../components/markdown/toolbar.vue';
import editor from '../../components/markdown/codemirror.vue';
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
};

export default Viewer;
</script>

<style lang="stylus" scoped>
.hack-font {
  font-family hack
  font-size 1.3em
}
</style>
