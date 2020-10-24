<template>
  <div class="team">
    <div>display team's players</div>
    <span v-for="(p,i) of team.players" :key="i">{{p.user.name}}</span>
    <Card class="small"
      v-for="(p,i) of team.players" :key="i" 
      :image="p.deck.img"/>
    <div>
      <v-btn icon
        @click="ind">
        <v-icon>mdi-shield</v-icon>
      </v-btn>
      <v-btn icon
        @click="ind">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon
        @click="ind">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
    <Count :count="team.life"/>
    <Count :count="team.pots"/>
    <Count v-for="(c, i) of team.coms" :key="i" :count="c"/>
  </div>
</template>

<script>
import Card from '../ui/Card';
import Count from '../ui/Count';
export default {
  name: 'mTeam',
  components: {Count, Card},
  props: {
    team: Object,
  },
  //data: ()=>({}),
  //computed: {},
  methods: {
    ind() {
      return
    },
  },
  //watch: {},
}
</script>

<style>
  .team {
    margin: 8px;
    padding: 4px;
    display: flex;
    flex-flow: column;
    align-items: center;
    background: #444;
    border-radius: 8px;
  }
</style>
