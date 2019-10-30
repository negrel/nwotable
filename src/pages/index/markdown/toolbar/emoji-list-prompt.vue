<template>
  <q-dialog v-model="active" @hide="close">
    <card>
      <div id="emoji-list" v-html="list" contenteditable="false">
      </div>
    </card>
  </q-dialog>
</template>

<script>
import card from 'src/components/card.vue';

import { parser } from 'src/class/Parser';

import { emojiList } from 'src/assets/emoji-list';

export default {
  props: {
    active: Boolean
  },
  components: {
    card
  },
  methods: {
    close() {
      this.$emit('close');
    }
  },
  computed: {
    list() {
      return parser.makeHtml(emojiList);
    }
  }
};
</script>

<style lang="stylus" scoped>
#emoji-list {
  font-size 1.2em
}
</style>
