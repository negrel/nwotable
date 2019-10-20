<template>
<q-list v-if="rootTags.length > 0"
    class="text-grey-1 drawer-list"
  >
    <q-item v-for="tag in rootTags"
      :key="tag.fullName"
      clickable
    >
    <q-item-section avatar>
        <q-icon name="fiber_manual_record" class="tagIcon q-mx-auto"/>
      </q-item-section>
    <q-item-label>
      {{ tags.name }}
    </q-item-label>
      <childrenTag :parent="tag">
    </q-item>
  </q-list>
</template>

<script>
export default {
  props: {
    children: []
  }
};
</script>
