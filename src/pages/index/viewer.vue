<template>
  <div id="viewer">
    <!-- TODO merge some buttons by groups -->
    <q-toolbar class="text-primary bg-grey-3">
      <button :class="{ 'btn-toolbar': true, 'text-orange-8': editMode }"
        @click="changeEditMode">
        <q-icon name="edit"/>
      </button>
      <button class="btn-toolbar"
        @click="switchBool()">
        <q-icon name="local_offer" />
      </button>
      <!-- <button :class="{ 'btn-toolbar': true, 'text-orange-8': attachment }"
        @click="attachment = inverse(attachment)">
        <q-icon name="attachment" class="rotate-270" />
      </button> -->
      <button :class="{ 'btn-toolbar': true, 'text-orange-8': meta.favorited }"
      @click="switchMetaBool">
        <q-icon name="star" v-if="meta.favorited" />
        <q-icon name="star_border" v-else />
      </button>
      <button :class="{ 'btn-toolbar': true, 'text-orange-8': meta.pinned }"
        @click="switchMetaBool">
        <q-icon name="room" />
      </button>
      <button :class="{ 'btn-toolbar': true, 'text-orange-8': false }"
        @click="deleteNote">
        <q-icon name="delete" />
      </button>
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

import { Note, MetaData } from '../../class/Note';

import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component({
  components: {
    editor
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

  switchMetaBool(el: MouseEvent): void {
    let src = el.srcElement ? el.srcElement as HTMLElement : null;

    if (src && src.innerText === 'room') {
      this.selectedNote.pinned = !this.selectedNote.pinned;
    } else {
      this.selectedNote.favorited = !this.selectedNote.favorited;
    }
    this.$store.dispatch('saveNote');
  }

  deleteNote(): void {
    this.$store.dispatch('deleteNote', this.selectedNote);
  }
};

export default Viewer;
</script>
