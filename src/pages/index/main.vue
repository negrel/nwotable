<template>
  <div class="bg-grey-1">
    <q-toolbar class="text-primary bg-grey-3">
      <searchBar />
      <toolbarButton :icons="['add']" @click="addNewNote"/>
    </q-toolbar>
    <q-bar @click="dateSort = !dateSort">
      <div>Date</div>
      <q-space />
      <q-icon name="keyboard_arrow_up" :class="{ 'rotate-180': dateSort }" />
    </q-bar>
    <div class="list" v-if="indexList.length !== 0">
      <q-list>
      <!-- TODO Limit size of title and ... end of line -->
        <q-item v-for="key in sortedList"
          :key="key"
          @click="selectNote(noteList[key])"
          active-class="q-item-hover"
          :class="{ 'q-item-active': noteList[key] === selectedNote }"
          clickable
        >
          <q-item-section>
            <q-item-label>{{ noteList[key].data.title }}</q-item-label>
            <q-item-label class="text-grey-5" caption>
              {{ noteList[key].data.meta.modified.toLocaleString() }}
            </q-item-label>
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
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { throttle } from 'lodash';

import { NoteType, Note } from '../../class/Note';
import searchBar from '../../components/search-bar.vue';
import toolbarButton from '../../components/toolbar-button.vue';

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
  @State(state => state.NoteList.indexList) indexList: number[];
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

    if (this.dateSort) {
      return [...pinned, ...other];
    } else {
      return [...pinned.reverse(), ...other.reverse()];
    }
  }

  addNewNote = throttle((): void => {
    this.$store.dispatch('addNewNote');
  }, 1500);
};

export default Main;
</script>
