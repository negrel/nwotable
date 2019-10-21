<template>
  <q-dialog v-model="active" @hide="close">
    <card>
      <h5>
        Download
      </h5>
      <span>
        Choose a format :
      </span>
      <div>
        <button title="Markdown"
          @click="selectedNote.downloadMD()"
          class="btn-toolbar"
        >
          <img src="statics/markdown.png"
            title="Markdown"
            style="width: 1.2rem;"
          />
          Markdown
        </button>
        <button title="HTML"
          @click="selectedNote.downloadHTML()"
          class="btn-toolbar"
        >
          <q-icon name="code" />
          HTML
        </button>
      </div>
    </card>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex';

import card from 'src/components/card';

export default {
  components: {
    card
  },
  props: {
    active: Boolean
  },
  methods: {
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

.card {
  min-width 40vw

  & > div {
    margin-top 1em

    & > button {
      padding .2em .5em
    }

    & button:last-child {
      margin-left 1em
    }
  }
}
</style>
