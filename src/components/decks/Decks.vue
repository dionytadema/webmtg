<template>
  <div class="decks">
    <AddDeck
      @added="added"/>
    <Deck v-for="d in decks" :key="d.id" :deck="d"/>
  </div>
</template>

<script>
import Deck from './Deck';
import AddDeck from './AddDeck';

export default {
  name: 'Decks',
  components: {
    Deck,
    AddDeck,
  },
  data: () => ({
    active: false,
    decks: [],
  }),
  methods: {
    added(deck) {
      this.decks.push(deck)
    },
    deleted(id) {
      this.decks.filter(d=>{return d.id!=id})
    },
  },
  async mounted() {
    let res = await fetch('API/decks.php')
    this.decks = await res.json()
  },
}
</script>

<style>
  .decks {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
</style>