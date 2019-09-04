<template>
  <div id="viewer">
    <!-- TODO merge some buttons by groups -->
    <q-toolbar class="text-primary bg-grey-3">
      <button class="btn-toolbar">
        <q-icon name="edit" />
      </button>
      <button class="btn-toolbar">
        <q-icon name="local_offer" />
      </button>
      <button class="btn-toolbar">
        <q-icon name="attachment" class="rotate-270" />
      </button>
      <q-space />
      <button class="btn-toolbar">
        <q-icon name="star_border" />
      </button>
      <button class="btn-toolbar">
        <q-icon name="turned_in_not" />
      </button>
      <q-space />
      <button class="btn-toolbar">
        <q-icon name="delete" />
      </button>
    </q-toolbar>
  </div>
</template>

<script>
export default {
};
</script>
