<template>
  <div class="deck">
    <Card :image="user.img"/>
    <div class="data">
      <span class="title">{{user.name}}</span>
      <div></div>
      <span class="owner">{{user.deck_count}} decks</span>
      <div></div>
      <span>{{user.win_count}} wins - {{user.lost_count}} losses</span>
    </div>
  </div>
</template>

<script>
import Card from '../ui/Card';
export default {
  name: 'User',
  components: {Card},
  props: {user: Object},
  //data: ()=>({}),
  //computed: {},
  //methods: {},
  //watch: {},
}
</script>

<style>
  .owner {
    color: #aaa;
  }
</style>
