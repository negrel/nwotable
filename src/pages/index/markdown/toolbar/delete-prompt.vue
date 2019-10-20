<template>
  <transition name="fade">
    <prompt header="Delete this note ?">
      <span> You are about to delete this note, are you sure ?</span>
      <br />
      <div class="buttons float-right">
        <button class="btn-toolbar" title="Cancel" @click="close">
          Cancel
        </button>
        <button class="btn-toolbar" title="Okay">
          I'm sure.
        </button>
      </div>
    </prompt>
  </transition>
</template>

<script>
import { mapState } from 'vuex';

import prompt from 'src/components/prompt.vue';

export default {
  components: {
    prompt
  },
  methods: {
    deleteNote() {
      this.$store.dispatch('deleteNote', this.selectedNote);
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
.buttons {
  margin-top 1em

  & button:last-child {
    margin-left 1em
    color $grey-1
    background-color $red-7

    &:hover {
      background-color $red-8
    }

    &:active {
      background-color $red-9
    }
  }
}
</style>
