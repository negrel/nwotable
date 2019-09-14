<template>
  <div id="drawer">
    <q-list class="text-grey-1">
      <q-item-label header>Menu</q-item-label>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="book" />
        </q-item-section>
        <q-item-section>
          <q-item-label>All Notes</q-item-label>
          <q-item-label class="text-grey-5" caption>
            <!-- TODO Insert number of notes -->
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="menu_book" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Notebooks</q-item-label>
          <q-item-label class="text-grey-5" caption>
            <!-- TODO Insert notebooks here -->
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="local_offer" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Tags</q-item-label>
          <q-item-label class="text-grey-5" caption></q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable tag="a" target="_blank" href="https://github.com/Nergel3/">
        <q-item-section avatar>
          <q-icon name="code" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Github</q-item-label>
          <q-item-label class="text-grey-5" caption>github.com/Nergel3</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
class Drawer extends Vue {

};

export default Drawer;
</script>
