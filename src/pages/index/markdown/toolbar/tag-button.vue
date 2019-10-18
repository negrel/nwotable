<template>
  <buttonSnippet>
    <template v-slot:button>
      <toolbarButton id="tagBtn" :icons="['local_offer']" title="Tag" />
    </template>
    <template v-slot:body>
      <q-list>
        <q-item v-for="tag in selectedNote.tags"
          :key="tag.name"
          clickable
          class="bg-white text-secondary q-pl-md q-pr-sm"
        >
          <q-item-section class="full-width">
            <q-item-label>{{ tag.name }}</q-item-label>
            <q-item-label class="text-grey-5 float-right" caption>
              <q-btn icon="clear"
                @click="selectedNote.delTag(tag)"
                size="xs"
                round
                flat
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <textField placeholder="Add a tag..."
        aria-label="tag-field"
        @keypress="addTag"
      />
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
import textField from 'src/components/text-field.vue';

@Component({
  components: {
    toolbarButton,
    toolbarButtonGroup,
    buttonSnippet,
    textField
  }
})
class TagButton extends Vue {
  @State(state => state.Editor.selectedNote) selectedNote: Note;
  addTag(event: KeyboardEvent): void {
    if (event.key === 'Enter' && event.srcElement) {
      const tagField = (event.srcElement as HTMLInputElement);
      this.$store.dispatch('addTag', tagField.value);
      tagField.value = '';
    }
  }

  mounted() {
    console.log(this.selectedNote);
  }
};

export default TagButton;
</script>

<style lang="stylus">
#tagBtn {
  border-left-width .5px!important
  border-radius 0px!important
  border-top-right-radius 5px!important
  border-bottom-right-radius 5px!important
  margin-right 1em!important
}
</style>
