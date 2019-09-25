<template>
  <div id="toolbar">
    <q-toolbar class="text-primary bg-grey-3">
      <toolbarButtonGroup>
        <toolbarButton :icons="['edit']" :active="editMode" @click="changeEditMode">
        </toolbarButton>
        <toolbarButton :icons="['local_offer']" />
      </toolbarButtonGroup>
      <!-- TODO add attachment button -->
      <!-- <button :class="{ 'btn-toolbar': true, 'text-orange-8': attachment }"
        @click="attachment = inverse(attachment)">
        <q-icon name="attachment" class="rotate-270" />
      </button> -->
      <toolbarButtonGroup>
        <toolbarButton :icons="['star_border', 'star']" :active="meta.favorited" @click="switchMetaBool('favorited')"/>
        <toolbarButton :icons="['room']" :active="meta.pinned" @click="switchMetaBool('pinned')"/>
      </toolbarButtonGroup>
      <toolbarButton :icons="['delete']" @click="deleteNote" />
      <!-- TODO add delete prompt -->
      <!-- TODO add split button to have the parsed and plain note -->
    </q-toolbar>

    <!-- NOTE Tags prompt  -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { Note, MetaData } from '../../class/Note';

import toolbarButtonGroup from '../../components/toolbar-button-group.vue';
import toolbarButton from '../../components/toolbar-button.vue';

@Component({
  components: {
    toolbarButtonGroup,
    toolbarButton
  }
})
class Toolbar extends Vue {
  @State(state => state.Editor.selectedNote) selectedNote: Note;
  @State(state => state.Editor.editMode) editMode: boolean;

  get meta(): MetaData | undefined {
    if (this.selectedNote) {
      return this.selectedNote.data.meta;
    }
  }

  changeEditMode(): void {
    this.$store.dispatch('setEditMode', !this.editMode);
  }

  switchMetaBool(string: string): void {
    switch (string) {
      case 'favorited':
        this.selectedNote.favorited = !this.selectedNote.favorited;
        break;
      case 'pinned':
        this.selectedNote.pinned = !this.selectedNote.pinned;
        if (this.selectedNote.pinned) {
          this.$store.dispatch('updateNote');
        }
        break;
    }

    this.$store.dispatch('saveNote');
  }

  deleteNote(): void {
    this.$store.dispatch('deleteNote', this.selectedNote);
  }
}
export default Toolbar;
</script>
