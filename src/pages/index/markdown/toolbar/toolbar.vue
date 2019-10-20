<template>
  <div id="toolbar">
    <q-toolbar class="text-primary bg-grey-3">
      <toolbarButtonGroup>
        <toolbarButton :icons="['edit']"
          title="Edit"
          @click="changeEditMode"
          v-if="!editMode"
        />
        <toolbarButton :icons="['edit']" :active="true"
          title="Save"
          @click="changeEditMode"
          v-else
        />
        <toolbarButton :icons="['attach_file']" title="Attachment" @click="importFile(fileLocal)" />
        <toolbarButton :icons="['local_offer']"
          title="Tag"
          :active="showTagPrompt"
          @click="showTagPrompt = !showTagPrompt"
        />
      </toolbarButtonGroup>
      <tagPrompt v-if="showTagPrompt" />
      <toolbarButtonGroup>
        <toolbarButton :icons="['star_border', 'star']"
          :active="meta.favorited"
          @click="switchMetaBool('favorited')"
          title="Favorite"
        />
        <toolbarButton :icons="['room']"
          :active="meta.pinned"
          title="Pin"
          @click="switchMetaBool('pinned')"
        />
      </toolbarButtonGroup>
      <toolbarButton :icons="['delete']"
        title="Delete"
        :active="showDeletePrompt"
        @click="showDeletePrompt = !showDeletePrompt"
      />
      <deletePrompt v-if="showDeletePrompt" @close="showDeletePrompt = false" />
      <!-- TODO add split button to have the parsed and plain note -->
      <toolbarButtonGroup class="float-right">
        <downloadButton />
        <toolbarButton :icons="['cloud_upload']"
          title="Import"
          @click="importFile(noteLocal)"
        />
      </toolbarButtonGroup>
    </q-toolbar>

    <!-- NOTE Tags prompt  -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';

// @ prefix doesn't work
import { Note, MetaData, NoteType } from 'src/class/Note';
import { Attachment } from 'src/class/Attachment';

import toolbarButtonGroup from 'src/components/toolbar-button-group.vue';
import toolbarButton from 'src/components/toolbar-button.vue';
import downloadButton from './download-button.vue';
import tagPrompt from './tag-prompt.vue';
import deletePrompt from './delete-prompt.vue';

@Component({
  components: {
    toolbarButtonGroup,
    toolbarButton,
    downloadButton,
    tagPrompt,
    deletePrompt
  }
})
class Toolbar extends Vue {
  @State(state => state.Editor.selectedNote) selectedNote: Note;
  @State(state => state.Editor.editMode) editMode: boolean;
  showTagPrompt: boolean;
  showDeletePrompt: boolean;

  constructor() {
    super();
    this.showTagPrompt = false;
    this.showDeletePrompt = false;
  }

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
  async noteLocal(note: File): Promise<void> {
    console.log(note);
    this.$store.dispatch('addNote', note);
  }

  fileLocal(file: File): void {
    this.$store.dispatch('saveAttachmentToDb', file);
    this.$store.dispatch('addAttachment', new Attachment(file));
  }
}
export default Toolbar;
</script>
