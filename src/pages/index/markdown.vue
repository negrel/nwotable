<template>
  <div>
    <div class="fit bg-white">
      <toolbar />
      <editor :editMode="editMode" :class="{ 'hack-font': editMode }" />
    </div>
  </div>
</template>

<script lang="ts">
import toolbar from '../../components/viewer/toolbar.vue';
import editor from '../../components/viewer/editor.vue';

import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component({
  components: {
    toolbar,
    editor
  }
})
class Viewer extends Vue {
  @State(state => state.Editor.editMode) editMode: boolean;
};

export default Viewer;
</script>
