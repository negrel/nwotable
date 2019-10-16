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
          <img src="https://s1.qwant.com/thumbr/0x380/b/9/9f075d769ce8dbc5e97d1234684e3b060ec9c79381405622e151b8df2c6794/markdown.png?u=http%3A%2F%2Fkirkstrobeck.github.io%2Fwhatismarkdown.com%2Fimg%2Fmarkdown.png&q=0&b=1&p=0&a=1"
            title="Markdown"
            style="width: 1.2rem;"
            @click="selectedNote.downloadMD()"
          />
        </button>
        <toolbarButton :icons="['picture_as_pdf']"
          title="PDF"
          @click="selectedNote.downloadPDF()"
        />
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
