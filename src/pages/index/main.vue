<template>
  <div class="bg-white" id="main">
    <q-toolbar class="text-primary bg-grey-3">
      <div id="search-field" class="fit">
        <input type="text" placeholder="Search..." />
          <button class="float-right">
            <q-icon name="search" />
          </button>
      </div>
      <button class="btn-toolbar">
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
        <q-item v-for="note in noteListFilterd" :key="note.body" @click="selectNote(note)" clickable>
          <q-item-section>
            <q-item-label>{{ note.body }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <!-- TODO add bottom button to trigger left drawer -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    titleSort: true
  }),
  mounted() {
    let dragger = document.getElementById('dragger-viewer');
    // TODO Request animation frame for better look

    dragger.addEventListener('mousedown', (event) => {
      window.addEventListener('mousemove', this.resizeMain);
    });

    window.addEventListener('mouseup', (event) => {
      window.removeEventListener('mousemove', this.resizeMain);
    });
  },
  methods: {
    resizeMain(event) {
      let endX = event.clientX;
      let main = document.getElementById('main');
      // 258px is the size of the drawer
      let width = endX - 258;
      main.style.width = width + 'px';
    },
    selectNote(note) {
      this.$store.dispatch('setSelectedNote', note);
    }
  },
  computed: {
    ...mapState({
      noteList: state => {
        return state.database.noteList;
      }
    }),
    noteListFilterd() {
      if (this.titleSort) {
        return this.noteList;
      } else {
        // Clone the array with slice then reverse it. NOTE You can't change store value from vue component.
        // TODO animate the list reverse.
        return this.noteList.slice(0).reverse();
      }
    }
  }
};
</script>
