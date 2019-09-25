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
      <toolbarButtonGroup class="float-right">
        <toolbarButton :icons="['save_alt']" @click="selectedNote.download()" />
        <toolbarButton :icons="['input']" @click="importNote"/>
      </toolbarButtonGroup>
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

  importNote(): void {
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;

    document.getElementsByTagName('body')[0].appendChild(input);
    input.click();

    input.addEventListener('change', async(): Promise<void> => {
      const files = input.files as any;
      if (files) {
        for (let i = 0, length = files.length; i < length; i++) {
          this.$store.dispatch('addNewNote', {
            title: files[i].name.split('.md')[0],
            content: await files[i].text(),
            meta: {
              created: files[i].lastModified,
              modified: files[i].lastModified
            }
          });
        }
      }
    });

    setInterval(() => {
      input.remove();
    }, 0);
  }

  deleteNote(): void {
    this.$store.dispatch('deleteNote', this.selectedNote);
  }
}
export default Toolbar;
</script>
