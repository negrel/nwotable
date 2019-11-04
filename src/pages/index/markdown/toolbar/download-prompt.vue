<template>
  <q-dialog :value="active" @hide="close">
    <card>
      <h5>
        Download
      </h5>
      <span>
        Choose a format :
      </span>
      <br/>
      <radioButton v-model="dlExt" val="md" label="Markdown (*.md)"/>
      <radioButton v-model="dlExt" val="html" label="HTML file (*.html)" class="float-right"/>
      <div>
        <radioButton v-model="dlMeta" val="with"
          label="with metadata header."
          :disable="dlExt !== 'md'"
        />
        <br/>
        <radioButton v-model="dlMeta" val="without"
          label="without header"
          :disable="dlExt !== 'md'"
        />
      </div>
      <br/>
      <div class="float-right">
        <button class="btn" title="Cancel">
          Cancel
        </button>
        <button
          class="btn bg-apple-blue text-grey-2"
          title="Download"
          @click="download"
        >
          Download
        </button>
      </div>
    </card>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex';

import radioButton from 'src/components/radio-button';
import card from 'src/components/card';

export default {
  components: {
    card,
    radioButton
  },
  props: {
    active: Boolean
  },
  data: () => ({
    dlExt: 'md',
    dlMeta: 'with'
  }),
  methods: {
    download() {
      const ext = this.dlExt;

      if (ext === 'html') {
        this.selectedNote.downloadHTML();
      } else if (ext === 'md') {
        const withMeta = this.dlMeta === 'with';
        this.selectedNote.downloadMD(withMeta);
      }
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
