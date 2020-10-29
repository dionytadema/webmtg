<template>
  <div class="team">
    <div class="header">
      <span class="title"
        >Team {{i+1}}</span>
      <mPlayerPicker
        @add-player="addPlayer"/>
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
    <mCount :count="team.life">
      <div>
        <v-btn icon
          @click="remove">
          <v-icon>mdi-shield</v-icon>
        </v-btn>
        <v-btn icon
          @click="remove">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn icon
          @click="remove">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </mCount>
    <mCount :count="team.pots"/>
    <mCount v-for="(c, i) of team.coms" :key="i" :count="c"/>
  </div>
</template>

<script>
import mCount from '../ui/Count';
import mPlayer from './Player';
import mPlayerPicker from './PlayerPicker';
import Player from '@/classes/Player';
export default {
  name: 'mTeam',
  components: {mCount, mPlayer, mPlayerPicker},
  props: {
    team: Object,
    i: Number,
  },
  //data: ()=>({}),
  //computed: {},
  methods: {
    remove() {
      this.$root.game.teams.splice(this.i, 1)
    },
    addPlayer(u) {
      if (!u) 
        u = this.$root.users[Math.floor((Math.random()*this.$root.users.length))]
      let d = this.$root.decks[Math.floor((Math.random()*this.$root.decks.length))]
      // Add player
      let player = new Player(u,d)
      this.team.players.push(player)
    },
    delPlayer(i) {
      this.team.players.splice(i,1)
    }
  },
  //watch: {},
}
</script>

<style>
  .team {
    margin: 8px;
    min-width: 250px;
    display: flex;
    flex-flow: column;
    background: #444;
    border-radius: 8px;
  }
  @media only screen and (max-width: 1200px) {
    .team {
      min-width: 200px;
    }
  }

  .team>.header {
    display: flex;
  }
  .team>.header>.title {
    flex: 1 0 auto;
    text-align: center;
  }
  .team .players {
    height: 148px;
    background: #333;
    display: flex;
    justify-content: space-around;
  }
</style>
