<template>
  <div class="deck">
      <Card :image="music.img"/>
      <div class="data">
        <span class="title">{{music.name}}</span>
        <v-btn icon
          @click="set">
          <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn icon
          @click="del">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
  </div>
</template>

<script>
import Card from '../ui/Card';
import LayeredMusic from '@/classes/LayeredMusic';
export default {
  name: 'Deck',
  components: {Card},
  props: {music: Object},
  //data: ()=>({}),
  //computed: {},
  methods: {
    del() {
      //this.$root.decks = this.$root.decks.filter(d=>{return d.id!=this.deck.id})
    },
    set() {
      let m = new LayeredMusic(this.music.layers)
      this.$root.game.music = m
      m.load()
    }
  }
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
</style>
