<template>
  <q-layout>
    <drawer />
    <mainSection />
  </q-layout>
</template>

<script>
import drawer from '../layouts/drawer.vue'
import mainSection from '../layouts/main.vue'

export default {
  components: {
    drawer,
    mainSection
  }
}
</script>
