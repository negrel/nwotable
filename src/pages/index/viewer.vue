<template>
  <div id="viewer">
    <!-- TODO merge some buttons by groups -->
    <q-toolbar class="text-primary bg-grey-3">
      <button :class="{ 'btn-toolbar': true, 'text-orange-8': editMode }"
        @click="changeEditMode()">
        <q-icon name="edit"/>
      </button>
      <button :class="{ 'btn-toolbar': true, 'text-orange-8': label }"
        @click="label = inverse(label)">
        <q-icon name="local_offer" />
      </button>
      <button :class="{ 'btn-toolbar': true, 'text-orange-8': attachment }"
        @click="attachment = inverse(attachment)">
        <q-icon name="attachment" class="rotate-270" />
      </button>
      <button :class="{ 'btn-toolbar': true, 'text-orange-8': favorite }"
      @click="favorite = inverse(favorite)">
        <q-icon name="star" v-if="favorite" />
        <q-icon name="star_border" v-else />
      </button>
      <button :class="{ 'btn-toolbar': true, 'text-orange-8': pin }"
        @click="pin = inverse(pin)">
        <q-icon name="turned_in" v-if="pin" />
        <q-icon name="turned_in_not" v-else />
      </button>
      <button :class="{ 'btn-toolbar': true, 'text-orange-8': trash }"
        @click="trash = inverse(trash)">
        <q-icon name="delete" />
      </button>
    </q-toolbar>
    <div class="fit bg-white">
      <mdViewer :note="selectedNote" v-if="!editMode" />
      <mdEditor :note="selectedNote" v-else />
    </div>
  </div>
</template>

<script>
import mdViewer from '../../components/md_viewer.vue';
import mdEditor from '../../components/md_editor.vue';
import { mapState } from 'vuex';

export default {
  data: () => ({
    label: false,
    attachment: false,
    favorite: false,
    pin: false,
    trash: false
  }),
  components: {
    mdViewer,
    mdEditor
  },
  methods: {
    changeEditMode() {
      this.$store.dispatch('changeEditMode');
    },
    inverse(bool) {
      return !bool;
    }
  },
  computed: mapState({
    selectedNote: state => state.editor.selectedNote,
    editMode: state => state.editor.editMode
  })
};
</script>
