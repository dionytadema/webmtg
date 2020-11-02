<template>
  <div class="decks">
    <!--AddDeck/-->
    <Music v-for="(m, i) in $root.music" :key="i" :music="m"/>
  </div>
</template>

<script>
import Music from './Music';
//import AddDeck from './AddDeck';

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

<style>
  .decks {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
</style>