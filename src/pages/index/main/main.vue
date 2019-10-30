<template>
  <div class="bg-grey-1">
    <q-toolbar class="text-primary bg-grey-3">
      <searchBar />
      <toolbarButton :icons="['add']"
        @click="addNewNote"
        title="Add"
      />
    </q-toolbar>
    <q-bar id="dateBar" @click="titleSort = !titleSort">
      <div>Title</div>
      <q-space />
      <q-icon name="keyboard_arrow_up" :class="{ 'rotate-180': titleSort }" />
    </q-bar>
    <div v-if="indexList.length !== 0">
      <q-list>
      <!-- TODO Limit size of title and ... end of line -->
        <q-item v-for="key in sortedList"
          :key="key"
          @click="selectNote(noteList[key])"
          active-class="q-item-active"
          :active="noteList[key] === selectedNote"
          clickable
        >
          <q-item-section>
            <q-item-label class="title" >{{ noteList[key].data.title }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon name="star" v-if="noteList[key].favorited" />
            <q-icon name="room" v-if="noteList[key].pinned" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div id="emptyList" v-else>
      <span class="text-grey-6">
        No note here.
      </span>
    </div>
    <!-- TODO add bottom button to trigger left drawer -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { throttle } from 'quasar';

import { NoteType, Note } from 'src/class/Note';
import searchBar from './search-bar.vue';
import toolbarButton from 'src/components/toolbar-button.vue';

@Component({
  components: {
    searchBar,
    toolbarButton
  }
})
class Main extends Vue {
  titleSort: boolean

  constructor() {
    super();
    this.titleSort = true;
  }

  mounted() {
    let dragger = document.getElementById('dragger-viewer');
    // TODO Request animation frame for better look

    if (dragger) {
      dragger.addEventListener('mousedown', () => {
        window.addEventListener('mousemove', this.resizeMain);
      });

      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', this.resizeMain);
      });
    }
  }

  resizeMain(event: MouseEvent) {
    let endX = event.clientX;
    let main = document.getElementById('main');
    // 258px is the size of the drawer
    let width = endX - 258;
    if (main) {
      main.style.width = width + 'px';
    }
  }
  selectNote(note: NoteType) {
    this.$store.dispatch('setSelectedNote', note);
  }

  @State(state => state.Notes.noteList) noteList: Note[];
  @State(state => state.Filters.filtredList) indexList: number[];
  @State(state => state.Editor.selectedNote) selectedNote: Note;

  get sortedList() {
    const pinned: number[] = [],
      other: number[] = [];

    this.indexList.forEach(index => {
      if (this.noteList[index].pinned) {
        pinned.push(index);
      } else {
        other.push(index);
      }
    });

    pinned.sort((a, b) => {
      if (this.noteList[a].title < this.noteList[b].title) return -1;
      if (this.noteList[a].title > this.noteList[b].title) return 1;
      return 0;
    });

    other.sort((a, b) => {
      if (this.noteList[a].title < this.noteList[b].title) return -1;
      if (this.noteList[a].title > this.noteList[b].title) return 1;
      return 0;
    });

    console.log([...pinned, ...other]);

    if (this.titleSort) {
      return [...pinned, ...other];
    } else {
      return [...pinned.reverse(), ...other.reverse()];
    }
  }

  addNewNote() {
    this.$store.dispatch('addNote');
  }

  @Watch('indexList')
  onIndexListChange() {
    if (this.indexList.length === 0) {
      const noNote = new Note();
      noNote.setupFromNote({
        title: '',
        content: '# You have no note saved... :slightly_frowning_face:',
        meta: {
          created: new Date().toString(),
          modified: new Date(),
          favorited: false,
          pinned: false,
          tags: []
        }
      });
      this.$store.dispatch('setSelectedNote', noNote, { root: true });
    }
  }
};

export default Main;
</script>

<style lang="stylus" scoped>
div {
  max-height 97vh
}

.q-list {
  height 100%
  width 100%
  max-height 95vh
  overflow-y auto
  overflow-x hidden

  & .q-item {
    word-break keep-all
    background-color white
    & i {
      font-size 1em
    }
  }

  & > .q-item:nth-child(even) {
    background-color $grey-1
  }

  & >  .q-item-active {
    color $secondary!important
    background-color $grey-3!important
  }

  & .title {
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  }

  // Scroll bar
  &::-webkit-scrollbar {
    width .5em
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background-color $grey-1;
    border-radius: 1000px
    box-shadow inset 0 0 3px $grey-6
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background-color $grey-5;
    border-radius: 1000px

    /* Handle on hover */
    &:hover {
      background-color $grey-6;
    }
  }
}

#dateBar {
  padding 0 1em
  background-color white!important
  color #908484
  max-height 1.5em
  border-bottom $grey-border

  & div {
    font-size .8em
  }

  & .q-icon {
    transition .1s ease-in-out
  }
}

#emptyList {
  display table
  text-align center
  height 2.5em

  & span {
    font-size 1.2em
    width 100vw
    display table-cell
    vertical-align middle
  }
}

</style>
