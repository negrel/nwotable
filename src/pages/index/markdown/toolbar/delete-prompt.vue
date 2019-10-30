<template>
  <q-dialog v-model="active" @hide="close">
    <card>
      <h5 class="q-mb-md q-mt-none">Warning !</h5>
      <span> You are about to delete this note, are you sure ?</span>
      <br />
      <div class="float-right">
        <button class="btn" title="Cancel" @click="close">
          Cancel
        </button>
        <button class="btn" title="Okay" @click="deleteNote">
          I'm sure.
        </button>
      </div>
    </card>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex';

import card from 'src/components/card.vue';

export default {
  components: {
    card
  },
  props: {
    active: Boolean
  },
  methods: {
    deleteNote() {
      this.$store.dispatch('deleteNote', this.selectedNote);
      this.close();
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

.card {
  min-width 40vw

  & > div {
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
}
</style>
