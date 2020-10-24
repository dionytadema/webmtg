<template>
  <div class="player">
    <span class="title">{{player.user.name}}</span>
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
  },
  //data: ()=>({}),
  //computed: {},
  //methods: {},
  //watch: {},
}
</script>

<style>
  .player {
    width: 240px;
    margin: 8px;
    padding: 4px;
    display: flex;
    flex-flow: column;
    align-items: center;
    background: #444;
    border-radius: 8px;
  }
</style>
