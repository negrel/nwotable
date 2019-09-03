<template>
  <q-page id="menu">
    <q-list tag="div" class="bg-secondary text-grey-1">
      <q-item-label header>Menu</q-item-label>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="book" />
        </q-item-section>
        <q-item-section>
          <q-item-label>All Notes</q-item-label>
          <q-item-label class="text-grey-5" caption>
            <!-- Insert number of notes -->
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="chat" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Notebooks</q-item-label>
          <q-item-label class="text-grey-5" caption>
            <!-- Insert notebooks here -->
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="tag" />
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
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
  }
}
</script>
