<template>
  <div class="decks">
    <AddDeck/>
    <Deck v-for="d in $root.decks" :key="d.id" :deck="d"/>
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
    players: [
      {name: "Diony",
        lives:20,
        poison:0,
        com: []},
      {name: "Jaffeth",
        lives:30,
        poison:2,
        com: [
          {name: "scion",
            damage: 5},
        ]},
      {name: "Brian",
        lives:26,
        poison:0,
        com: [
          {name: "test",
            damage: 5},
          {name: "scion",
            damage: 20},
        ]},
    ],
  }),
}
</script>

<style>
  .decks {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
</style>