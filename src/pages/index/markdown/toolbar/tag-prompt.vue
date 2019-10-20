<template>
  <transition name="fade">
    <prompt header="Tag list">
      <q-list>
        <q-item v-for="tag in selectedNote.tags"
          :key="tag.name"
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
      </q-list>
      <text-field placeholder="Enter a tag name..."
        aria-label="tag-field"
        @keypress="addTag"
        id="tagField"
      />
    </prompt>
  </transition>
</template>

<script>
import { mapState } from 'vuex';

import prompt from 'src/components/prompt.vue';
import textField from 'src/components/text-field.vue';

export default {
  components: {
    prompt,
    textField
  },
  mounted() {
    document.querySelector('#tagField > input[type=text]').focus();
  },
  methods: {
    addTag(event) {
      if (event.key === 'Enter' && event.srcElement) {
        const tagField = event.srcElement;
        this.$store.dispatch('addTag', tagField.value);
        tagField.value = '';
      }
    }
  },
  computed: mapState({
    selectedNote: state => state.Editor.selectedNote
  })
};
</script>

<style lang="stylus" scoped>
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
