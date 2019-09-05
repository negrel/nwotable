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
      <q-icon name="keyboard_arrow_up" :class="{ titleSort }" />
    </q-bar>
    <div class="list">
      <q-list>
      <!-- TODO List the note here -->
        <q-item clickable>
            <q-item-section>
              <q-item-label>Title here</q-item-label>
            </q-item-section>
          </q-item>
        <q-item clickable>
          <q-item-section>
              <q-item-label>Second here</q-item-label>
            </q-item-section>
          </q-item>
        <q-item clickable>
          <q-item-section>
              <q-item-label>Third here</q-item-label>
            </q-item-section>
          </q-item>
      </q-list>
    </div>
    <!-- TODO add bottom button to trigger left drawer -->
  </div>
</template>

<script>
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
    }
  }
};
</script>
