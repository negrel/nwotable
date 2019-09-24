<template>
	<div id="search-field" class="fit">
		<input type="text" placeholder="Search..." />
		<toolbarButton :icons="['search']"/>
	</div>
</template>

<script lang='ts'>
import toolbarButton from './toolbarButton.vue';

import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  components: {
    toolbarButton
  }
})
class SearchBar extends Vue {
  @Prop({ default: false })
  compact: boolean
};

export default SearchBar;
</script>

<style lang="stylus" scoped>
  #search-field {
    border $header-border
    border-radius 5px
    overflow hidden
    padding .1em .5em
    margin-right 1em
    background-color white

    & input[type=text] {
      width 85%
    }

    & * {
      border none
      outline none
      color black
      background-color white
    }
  }
</style>
