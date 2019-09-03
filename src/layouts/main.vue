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
</template>

<script>
export default {
  data: () => ({
    titleSort: true
  })
}
</script>
