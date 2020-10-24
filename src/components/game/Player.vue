<template>
  <div class="player">
    <div>
      <span class="title">{{player.user.name}}</span>
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
    margin: 8px;
    padding: 4px;
    display: flex;
    flex-flow: column;
    align-items: center;
    background: #333;
    border-radius: 8px;
  }
</style>
