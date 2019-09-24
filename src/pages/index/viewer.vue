<template>
  <div id="markdown">
    <!-- TODO merge some buttons by groups -->
    <q-toolbar class="text-primary bg-grey-3">
      <toolbarButtonGroup>
        <toolbarButton :icons="['edit']" :condition="editMode" @click="changeEditMode" :active="true"/>
        <toolbarButton :icons="['local_offer']" @click="switchBool()"/>
      </toolbarButtonGroup>
      <!-- TODO add attachment button -->
      <!-- <button :class="{ 'btn-toolbar': true, 'text-orange-8': attachment }"
        @click="attachment = inverse(attachment)">
        <q-icon name="attachment" class="rotate-270" />
      </button> -->
      <toolbarButtonGroup>
        <toolbarButton :icons="['star', 'star_border']" @click="switchMetaBool('favorited')" :active="true"/>
        <toolbarButton :icons="['room']" @click="switchMetaBool('pinned')" :active="true"/>
      </toolbarButtonGroup>
      <toolbarButton :icons="['delete']" @click="deleteNote" />
      <!-- TODO add delete prompt -->
      <!-- TODO add split button to have the parsed and plain note -->
    </q-toolbar>
    <div class="fit bg-white">
      <editor :editMode="editMode" :class="{ 'hack-font': editMode }" />
    </div>
  </div>
</template>

<script lang="ts">
import editor from '../../components/editor.vue';
import toolbarButtonGroup from '../../components/toolbarButtonGroup.vue';
import toolbarButton from '../../components/toolbarButton.vue';

import { Note, MetaData } from '../../class/Note';

import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component({
  components: {
    editor,
    toolbarButtonGroup,
    toolbarButton
  }
})
class Viewer extends Vue {
  // Property

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
};

export default Viewer;
</script>
