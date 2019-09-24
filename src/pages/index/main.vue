<template>
  <div class="bg-white" id="main">
    <q-toolbar class="text-primary bg-grey-3">
      <searchBar />
      <toolbarButton :icons="['add']" @click="addNewNote"/>
    </q-toolbar>
    <q-bar @click="dateSort = !dateSort">
      <div>Date</div>
      <q-space />
      <q-icon name="keyboard_arrow_up" :class="{ 'rotate-180': dateSort }" />
    </q-bar>
    <div class="list" v-if="sortedList.length !== 0">
      <q-list>
      <!-- TODO Limit size of title and ... end of line -->
        <q-item v-for="noteObj in sortedList"
          :key="noteObj.data.meta.created"
          @click="selectNote(noteObj)"
          active-class="q-item-hover"
          :class="{ 'q-item-active': noteObj === selectedNote }"
          clickable
        >
          <q-item-section>
            <q-item-label>{{ noteObj.data.title }}</q-item-label>
            <q-item-label class="text-grey-5" caption>
              {{ noteObj.data.meta.modified.toLocaleString() }}
            </q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon name="star" v-if="noteObj.favorited" />
            <q-icon name="room" v-if="noteObj.pinned" />
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
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { throttle } from 'lodash';

import { NoteType, Note } from '../../class/Note';
import searchBar from '../../components/searchBar.vue';
import toolbarButton from '../../components/toolbarButton.vue';

@Component({
  components: {
    searchBar,
    toolbarButton
  }
})
class Main extends Vue {
  dateSort: boolean

  constructor() {
    super();
    this.dateSort = true;
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

  @State(state => state.NoteList.noteList) noteList: Note[];
  @State(state => state.Editor.selectedNote) selectedNote: Note;
  @State(state => state.NoteList.filter) filterNote: Function;

  get sortedList() {
    let noteList = this.filterNote(this.noteList);

    if (!this.dateSort) {
      const pinned = noteList.filter((el: Note) => el.pinned);
      const other = noteList.filter((el: Note) => !el.pinned);
      return [...pinned, ...other];
    }

    return noteList;
  }

  addNewNote = throttle((): void => {
    this.$store.dispatch('addNewNote');
  }, 1500);
};

export default Main;
</script>
