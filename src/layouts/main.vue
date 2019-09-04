<template>
  <div class="bg-white" id="main">
    <q-toolbar class="text-primary bg-grey-3">
      <div id="search-field" class="row">
        <input class="col-auto" type="text" placeholder="Search..." />
          <q-icon name="search" />
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
    <div class="dragger" id="dragger-drawer" />
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
    <div class="dragger-viewer" id="dragger-viewer"/>
  </div>
</template>

<script>
export default {
  data: () => ({
    titleSort: true
  }),
  mounted() {
    let draggerDrawer = document.getElementById('dragger-drawer');
    // TODO Request animation frame for better look
    draggerDrawer.addEventListener('mousedown', (event) => {
      window.addEventListener('mousemove', this.resize);
    });
    window.addEventListener('mouseup', (event) => {
      window.removeEventListener('mousemove', this.resize);
    });

    let draggerViewer = document.getElementById('dragger-viewer');

    draggerViewer.addEventListener('mousedown', (event) => {
      window.addEventListener('mousemove', this.resize);
    });
  },
  methods: {
    resize(event) {
      let drawer = document.getElementById('drawer');
      let main = document.getElementById('main');
      let endX = event.clientX;
      drawer.style.width = endX + 'px';
      main.style.width = window.innerWidth - endX + 'px';
    }
  }
};
</script>
