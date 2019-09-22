<template>
  <div class="bg-white" id="main">
    <q-toolbar class="text-primary bg-grey-3">
      <div id="search-field" class="fit">
        <input type="text" placeholder="Search..." />
          <button class="float-right">
            <q-icon name="search" />
          </button>
      </div>
      <button class="btn-toolbar" @click="addNewNote" >
        <q-icon name="add" />
      </button>
    </q-toolbar>
    <q-bar @click="dateSort = !dateSort">
      <div>Date</div>
      <q-space />
      <q-icon name="keyboard_arrow_up" :class="{ 'rotate-180': dateSort }" />
    </q-bar>
    <div class="list">
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
              {{ noteObj.data.meta.modified.toLocaleDateString() }}
            </q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon name="star" v-if="noteObj.favorited" />
            <q-icon name="room" v-if="noteObj.pinned" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <!-- TODO add bottom button to trigger left drawer -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { throttle } from 'lodash';

import { NoteType, Note } from '../../class/Note';

@Component class Main extends Vue {
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

  addNewNote = throttle((): void => {
    this.$store.dispatch('addNewNote');
  }, 1500);

  @State(state => state.NoteList.sortedList) noteList: Note[];
  @State(state => state.Editor.selectedNote) selectedNote: Note;

  get sortedList() {
    if (this.dateSort) {
      return this.noteList;
    } else {
      return this.noteList.slice(0).reverse();
    }
  }
};

export default Main;
</script>
