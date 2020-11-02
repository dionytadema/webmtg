<template>
  <div class="player">
    <div class="header">
      <!--Card class="icon" :image="player.user.img"/-->
      <span class="title">
        {{player.user.name}}</span>
      <mDeckPicker
        @set-deck="setDeck"/>
      <v-btn icon
        @click="$emit('del-player',i)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
    <Card v-if="player.deck" :image="player.deck.img"/>
  </div>
</template>

<script>
import Card from '../ui/Card';
import mDeckPicker from './DeckPicker';
export default {
  name: 'mPlayer',
  components: {mDeckPicker, Card},
  props: {
    player: Object,
    i: Number
  },
  //data: ()=>({}),
  //computed: {},
  methods: {
    setDeck(deck) {
      this.player.deck = deck
    }
  },
  //watch: {},
}
</script>

<style>
  .player {
    margin: 4px;
    padding: 4px;
    display: flex;
    flex-flow: column;
    background: #444;
    border-radius: 8px;
  }
  .player>.header {
    display: flex;
  }
  .player>.header>.title {
    flex: 1 0 auto;
    text-align: center;
  }
</style>
