<template>
  <div class="deck">
    <Card :image="img"/>
    <div class="data">
      <span class="title">{{name}}</span>
      <div></div>
      <span class="owner">{{deckCount}} decks</span>
      <div></div>
      <span>0 wins - 0 losses</span>
    </div>
  </div>
</template>

<script>
import Card from '../ui/Card';
export default {
  name: 'User',
  components: {Card},
  props: {
    name: String,
    img: Number,
    owner: String,
  },
  //data: ()=>({}),
  computed: {
    deckCount() {
      let count = 0
      for (let d of this.$root.decks) 
        if (d.owner == this.name)
          count++
      return count
    }
  },
  //methods: {},
  //watch: {},
}
</script>

<style>
  .deck {
    width: 400px;
    margin: 8px;
    padding: 4px;
    display: flex;
    background: #444;
    border-radius: 8px;
  }

  .data {
    margin-left: 8px;
  }

  .owner {
    color: #aaa;
  }
</style>
