<template>
  <div class="play">
    <div class="toolbar">
      <v-select class="mx-2"
        v-model="game.mode"
        :items="['casual','commander','headedgiant']"/>
      <div style="flex:5 0 0px"/>
      <v-btn class="mx-2"
        @click="startGame">
        start</v-btn>
      <v-btn class="mx-2"
        @click="endGame">
        end</v-btn>
    </div>
    <mTeam v-for="(t, i) of game.teams" :key="i" :team="t" :idx="i"/>
    <mPlayer v-for="(p, i) of game.players" :key="i" :player="p"/>
    <AddTeam/>
  </div>
</template>

<script>
import mPlayer from './Player';
import mTeam from './Team';
import AddTeam from './AddTeam';
import Player from '@/classes/Player';
export default {
  name: 'Game',
  components: {mPlayer, mTeam, AddTeam},
  //props: {},
  //data: ()=>({}),
  data: () => ({}),
  computed: {
    game() {
      return this.$root.game
    }
  },
  methods: {
    addPlayer() {
      let user = this.$root.users[Math.floor((Math.random()*this.$root.users.length))]
      let deck = this.$root.decks[Math.floor((Math.random()*this.$root.decks.length))]
      // Add player
      this.game.players.push(new Player(user,deck))
    },
    startGame() {
      if (this.game.active && !confirm("Het spel is al gestart, wil je restarten?"))
        return
      this.game.active = true
      let comms = []
      // Reset teams and collect commanders
      for (let t of this.game.teams) {
        t.reset(this.game.mode)
        comms.push(...t.getComms())
      }
      // Set commander damage for teams
      if (this.game.mode == "commander")
        for (let t of this.game.teams) {
          t.addComms(comms)
        }
    },
    endGame() {
      //stop music
      //write stats
    }
  }
  //watch: {},
}
</script>

<style>
  .play {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
  }

  .toolbar {
    width: 100%;
    height: 73px;
    display: flex;
    flex-flow: row;
    align-items: center;
    background: #333;
  }
</style>