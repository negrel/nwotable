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
    <q-bar @click="titleSort = !titleSort">
      <div>Title</div>
      <q-space />
      <q-icon name="keyboard_arrow_up" :class="{ 'rotate-180': titleSort }" />
    </q-bar>
    <div class="list">
      <q-list>
      <!-- TODO Limit size of title and ... end of line -->
        <q-item v-for="noteObj in noteListFilterd"
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
        </q-item>
      </q-list>
    </div>
    <!-- TODO add bottom button to trigger left drawer -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { NoteType, Note } from '../../class/Note';

@Component class Main extends Vue {
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

  addNewNote(): void {
    this.$store.dispatch('addNewNote');
  }

  @State(state => state.Database.noteList) noteList: Note[];
  @State(state => state.Editor.selectedNote) selectedNote: Note;

  get noteListFilterd() {
    if (this.titleSort) {
      return this.noteList;
    } else {
      // Clone the array with slice then reverse it. NOTE You can't change store value from vue component.
      // TODO transition when the list reverse.
      return this.noteList.slice(0).reverse();
    }
  }
};

export default Main;
</script>
