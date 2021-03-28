<template>
  <div class="deck">
    <Music v-for="(m, i) in $root.music" :key="i" :music="m"/>
  </div>
</template>

<script>
import Music from './Music';

export default {
  name: 'Decks',
  components: {
    Music,
  },
  //props: {},
  //data: ()=>({}),
  //computed: {},
  //methods: {},
  //watch: {},
}
</script>

<style></style>