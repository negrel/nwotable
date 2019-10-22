<template>
  <q-dialog v-model="active"
    @hide="close"
  >
    <card>
      <h5>
        Add a tag to the note.
      </h5>
      <q-list>
        <div v-if="selectedNote.tags.length">
          <q-item v-for="tag in selectedNote.tags"
            :key="tag.fullName"
            clickable
            class="bg-white text-secondary q-pl-md q-pr-sm"
          >
            <q-item-section class="full-width">
              <q-item-label>{{ tag.fullName }}</q-item-label>
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
        </div>
        <q-item
          class="bg-white text-secondary q-pl-md q-pr-sm"
          v-else
        >
          <q-item-label>
            No tags on this note
          </q-item-label>
        </q-item>
      </q-list>
      <text-field placeholder="Enter a tag name..."
        aria-label="tag-field"
        @keypress="addTag"
      />
    </card>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex';

import card from 'src/components/card.vue';
import textField from 'src/components/text-field.vue';

export default {
  props: {
    active: Boolean
  },
  components: {
    card,
    textField
  },
  methods: {
    addTag(event) {
      if (event.key === 'Enter' && event.srcElement) {
        const tagField = event.srcElement;
        this.$store.dispatch('addTag', tagField.value);
        tagField.value = '';
      }
    },
    close() {
      this.$emit('close');
    }
  },
  computed: mapState({
    selectedNote: state => state.Editor.selectedNote
  })
};
</script>

<style lang="stylus" scoped>
h5 {
  margin-top 0px
  margin-bottom .5em
}

.q-item {
  min-width fit-content
}

.q-item:first-child {
  border-top-right-radius 1em
  border-top-left-radius 1em
}

.q-item:last-child {
  border-bottom-right-radius 1em
  border-bottom-left-radius 1em
  margin-bottom 1em
}
</style>
