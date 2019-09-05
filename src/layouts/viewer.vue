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
      <button class="btn-toolbar">
        <q-icon name="star_border" />
      </button>
      <button class="btn-toolbar">
        <q-icon name="turned_in_not" />
      </button>
      <button class="btn-toolbar">
        <q-icon name="delete" />
      </button>
    </q-toolbar>
    <div class="fit bg-white">
      <mdViewer />
    </div>
  </div>
</template>

<script>
import mdViewer from '../components/md_viewer.vue';

export default {
  components: {
    mdViewer
  }
};
</script>
