<template>
  <div class="team">
    <div class="title">Team {{idx+1}}
      <v-btn icon
        @click="remove">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
    <div class="players">
      <mPlayer v-for="(p,i) of team.players" :key="i" 
        :player="p" :i="i"
        @del-player="delPlayer"/>
    </div>
    <v-btn class="mx-2"
      @click="addPlayer"
      fab>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
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
import Count from '../ui/Count';
import mPlayer from './Player';
import Player from '@/classes/Player';
export default {
  name: 'mTeam',
  components: {Count, mPlayer},
  props: {
    team: Object,
    idx: Number,
  },
  //data: ()=>({}),
  //computed: {},
  methods: {
    remove() {
      this.$root.game.teams.splice(this.idx, 1)
    },
    addPlayer() {
      let user = this.$root.users[Math.floor((Math.random()*this.$root.users.length))]
      let deck = this.$root.decks[Math.floor((Math.random()*this.$root.decks.length))]
      // Add player
      let player = new Player(user,deck)
      this.team.players.push(player)
    },
    delPlayer(i) {
      console.log(i)
      this.team.players.splice(i,1)
    },
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
  .team .players {
    display: flex;
  }
</style>
