<template>
  <div>
    <buttonSnippet>
      <template #button>
        <toolbarButton :icons="['help']" title="Help" />
      </template>
      <template #body>
        <toolbarButtonGroup>
          <toolbarButton
            :icons="['emoji_emotions']"
            title="Emoticons list"
            @click="showEmojiList = !showEmojiList"
            :active="showEmojiList"
          />
          <a href="https://www.markdownguide.org/" target="blank">
            <button title="Markdown Syntax"
              class="btn md-help"
            >
            <q-icon name="code" />
            </button>
          </a>
        </toolbarButtonGroup>
      </template>
    </buttonSnippet>
    <emojiList :active="showEmojiList" @close="showEmojiList = false"/>
  </div>
</template>

<script>
import buttonSnippet from 'src/components/button-snippet.vue';
import toolbarButtonGroup from 'src/components/toolbar-button-group.vue';
import toolbarButton from 'src/components/toolbar-button.vue';
import emojiList from './emoji-list-prompt.vue';

export default {
  components: {
    buttonSnippet,
    toolbarButtonGroup,
    toolbarButton,
    emojiList
  },
  data: () => ({
    showEmojiList: false,
    showMarkdownSyntax: false
  })
};
</script>

<style lang="stylus" scoped>
.md-help {
  border-top-left-radius 0px!important
  border-bottom-left-radius 0px!important
  border-bottom-right-radius 5px!important
  border-top-right-radius 5px!important
}
</style>
