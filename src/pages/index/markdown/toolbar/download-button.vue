<template>
  <buttonSnippet>
    <template v-slot:button>
      <toolbarButton :icons="['save_alt']"
        title="Download"
      />
    </template>
    <template v-slot:body>
      <toolbarButtonGroup>
        <button class="btn-toolbar">
          <img src="statics/markdown.png"
            title="Markdown"
            style="width: 1.2rem;"
            @click="selectedNote.downloadMD()"
          />
        </button>
        <!-- <toolbarButton :icons="['picture_as_pdf']"
          title="PDF"
          @click="selectedNote.downloadPDF()"
        /> -->
        <toolbarButton :icons="['code']"
          title="HTML"
          @click="selectedNote.downloadHTML()"
        />
      </toolbarButtonGroup>
    </template>
  </buttonSnippet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { Note, MetaData, NoteType } from 'src/class/Note';

import toolbarButton from 'src/components/toolbar-button.vue';
import buttonSnippet from 'src/components/button-snippet.vue';
import toolbarButtonGroup from 'src/components/toolbar-button-group.vue';

@Component({
  components: {
    toolbarButton,
    toolbarButtonGroup,
    buttonSnippet
  }
})
class DownloadButton extends Vue {
  @State(state => state.Editor.selectedNote) selectedNote: Note;
};

export default DownloadButton;
</script>
