<template>
  <div id="toolbar">
    <q-toolbar class="text-primary bg-grey-3">
      <toolbarButtonGroup>
        <toolbarButton :icons="['edit']" :active="editMode" @click="changeEditMode" />
        <toolbarButton :icons="['attach_file']" @click="importFile(fileLocal)" />
        <toolbarButton :icons="['local_offer']" />
      </toolbarButtonGroup>
      <toolbarButtonGroup>
        <toolbarButton :icons="['star_border', 'star']" :active="meta.favorited" @click="switchMetaBool('favorited')"/>
        <toolbarButton :icons="['room']" :active="meta.pinned" @click="switchMetaBool('pinned')"/>
      </toolbarButtonGroup>
      <toolbarButton :icons="['delete']" @click="deleteNote" />
      <!-- TODO add delete prompt -->
      <!-- TODO add split button to have the parsed and plain note -->
      <toolbarButtonGroup class="float-right">
        <toolbarButton :icons="['save_alt']" @click="selectedNote.download()" />
        <toolbarButton :icons="['input']" @click="importFile(noteLocal)"/>
      </toolbarButtonGroup>
    </q-toolbar>

    <!-- NOTE Tags prompt  -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { Note, MetaData } from '../../class/Note';
import { Attachment } from '../../class/Attachment';

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
        break;
    }
    this.$store.dispatch('updateNote');
  }

  importFile(func: Function): void {
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;

    document.getElementsByTagName('body')[0].appendChild(input);
    input.click();

    input.addEventListener('change', async(): Promise<void> => {
      // eslint-disable-next-line
      const files = input.files as any;
      if (files) {
        for (let i = 0, length = files.length; i < length; i++) {
          func(files[i]);
        }
      }
    });
    input.remove();
  }

  // eslint-disable-next-line
  async noteLocal(note: any): Promise<void> {
    this.$store.dispatch('addNewNote', {
      title: note.name.split('.md')[0],
      content: await note.text(),
      meta: {
        created: note.lastModified,
        modified: note.lastModified
      }
    });
  }

  fileLocal(file: File): void {
    this.$store.dispatch('saveAttachmentToDb', file);
    this.$store.dispatch('addAttachment', new Attachment(file));
  }

  deleteNote(): void {
    this.$store.dispatch('deleteNote', this.selectedNote);
  }
}
export default Toolbar;
</script>
