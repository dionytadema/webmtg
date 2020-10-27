<template>
  <div class="player">
    <div class="header">
      <span class="title">
        {{player.user.name}}</span>
      <v-btn icon
        @click="$emit('del-player',i)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
    <Card :image="player.deck.img"/>
  </div>
</template>

<script>
import Card from '../ui/Card';
export default {
  name: 'mPlayer',
  components: {Card},
  props: {
    player: Object,
    i: Number
  },
  //data: ()=>({}),
  //computed: {},
  //methods: {},
  //watch: {},
}
</script>

<style>
  .player {
    margin: 4px;
    padding: 4px;
    display: flex;
    flex-flow: column;
    background: #333;
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
