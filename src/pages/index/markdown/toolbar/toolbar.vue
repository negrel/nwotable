<template>
  <div id="toolbar">
    <q-toolbar class="bg-grey-3">
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
        <toolbarButton :icons="['attach_file']"
          title="Attachment"
          @click="showAttachPrompt = !showAttachPrompt"
        />
        <toolbarButton :icons="['local_offer']"
          title="Tag"
          :active="showTagPrompt"
          @click="showTagPrompt = !showTagPrompt"
        />
      </toolbarButtonGroup>
      <attachPrompt :active="showAttachPrompt" @close="showAttachPrompt = false" />
      <tagPrompt :active="showTagPrompt" @close="showTagPrompt = false" />
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
      <deletePrompt :active="showDeletePrompt" @close="showDeletePrompt = false"/>
      <!-- TODO add split button to have the parsed and plain note -->
      <toolbarButtonGroup class="float-right">
        <toolbarButton :icons="['save_alt']"
          title="Download"
          :active="showDownloadPrompt"
          @click="showDownloadPrompt = !showDownloadPrompt"
        />
        <toolbarButton :icons="['cloud_upload']"
          title="Import"
          @click="importNote"
        />
      </toolbarButtonGroup>
      <downloadPrompt :active="showDownloadPrompt" @close="showDownloadPrompt = false" />
      <helpSnippet />
    </q-toolbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { Note, MetaData, NoteType } from 'src/class/Note';

import toolbarButtonGroup from 'src/components/toolbar-button-group.vue';
import toolbarButton from 'src/components/toolbar-button.vue';
import tagPrompt from './tag-prompt.vue';
import attachPrompt from './attach-prompt.vue';
import deletePrompt from './delete-prompt.vue';
import downloadPrompt from './download-prompt.vue';
import helpSnippet from './help-snippet.vue';

@Component({
  components: {
    toolbarButtonGroup,
    toolbarButton,
    tagPrompt,
    attachPrompt,
    deletePrompt,
    downloadPrompt,
    helpSnippet
  }
})
class Toolbar extends Vue {
  @State(state => state.Editor.selectedNote) selectedNote: Note;
  @State(state => state.Editor.editMode) editMode: boolean;
  showTagPrompt: boolean;
  showAttachPrompt: boolean;
  showDeletePrompt: boolean;
  showDownloadPrompt: boolean;

  constructor() {
    super();
    this.showTagPrompt = false;
    this.showAttachPrompt = false;
    this.showDeletePrompt = false;
    this.showDownloadPrompt = false;
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

  importNote(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;

    document.getElementsByTagName('body')[0].appendChild(input);
    input.click();

    input.addEventListener('change', async(): Promise<void> => {
      // eslint-disable-next-line
      const files = input.files as any;
      if (files) {
        for (let i = 0, length = files.length; i < length; i++) {
          this.$store.dispatch('addNote', files[i]);
        }
      }
    });
    input.remove();
  }
}
export default Toolbar;
</script>
