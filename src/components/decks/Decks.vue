<template>
  <div class="decks">
    <AddDeck
      @added="added"/>
    <Deck v-for="d in decks" :key="d.id" :deck="d"
      @deleted="deleted"/>
  </div>
</template>

<script>
import AddDeck from './AddDeck';
import Deck from './Deck';
export default {
  name: 'Decks',
  components: {
    AddDeck,
    Deck,
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
      console.log(`removing ${id}`)
      let idx = this.decks.map(d=>d.id).indexOf(id)
      this.decks.splice(idx, 1);
    },
  },
  //watch: {},
  async mounted() {
    let res = await fetch('API/decks/get.php')
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