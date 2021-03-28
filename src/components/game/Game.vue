<template>
  <div class="play">
    <div class="toolbar">
      <v-select class="mx-2"
        v-model="game.mode"
        :items="['casual','teams','commander','archenemy','event']"/>
      <div style="flex:5 0 0px"/>
      <v-btn class="mx-2"
        @click="addTeam">
        add team</v-btn>
      <v-btn class="mx-2"
        @click="startGame">
        start</v-btn>
      <v-btn class="mx-2"
        @click="endGame">
        end</v-btn>
    </div>
    <mMusic :game="game"/>
    <mTeam v-for="(t, i) of game.teams" :key="i" :team="t" :i="i"
      @remove="delTeam(i)"
      @shoot="hit(i)"
      @win="win(i)"/>
  </div>
</template>

<script>
import Team from '@/classes/Team';
import mTeam from './Team';
import mMusic from './Music';

export default {
  name: 'Game',
  components: {mTeam, mMusic},
  //props: {},
  //data: ()=>({}),
  data: () => ({
    track: null,
  }),
  computed: {
    game() {
      return this.$root.game
    },
  },
  methods: {
    hit(i) {
      this.game.teams.forEach((t,x)=>{
        if (i!=x)
          t.life.add(-1)
      })
    },
    addTeam() {
      this.game.teams.push(new Team()) 
    },
    delTeam(i) {
      this.game.teams.splice(i, 1)
    },
    startGame() {
      if (this.game.active && !confirm("The game has already started, Reset and restart the game?"))
        return
      this.game.active = true

      let comms = []
      // Reset teams and collect commanders
      let i = 0
      for (let t of this.game.teams) {
        let mode = this.game.mode
        if (i && ["archenemy","event"].includes(mode))
          mode = "casual"
        t.reset(mode)
        comms.push(...t.getComms())
        i++
      }
      // Set commander damage for teams
      if (this.game.mode == "commander")
        for (let t of this.game.teams) {
          t.addComms(comms)
        }
      this.startMusic()
    },
    async startMusic() {
      if (!this.game.music)
        return
      await this.game.music.load()
      this.game.music.start()
    },
    async endGame() {
      if (!this.game.active) {
        alert("The game hasn't started yet!")
        return
      }
      if (this.game.teams.filter(t=>{return t.alive}).lenght>1) {
        alert("There are still multiple teams alive!")
        return
      }
      if (this.game.music)
        this.game.music.stop()
      // Collect stats
      let teams_won = this.game.teams.filter(t=>{return t.alive})
      let teams_lost = this.game.teams.filter(t=>{return !t.alive})
      let stats = []
      for (let team of teams_won) {
        for (let player of team.players) {
          stats.push({
            user: player.user.id,
            deck: player.deck.id,
            result: "won"
          })
        }
      }
      for (let team of teams_lost) {
        for (let player of team.players) {
          stats.push({
            user: player.user.id,
            deck: player.deck.id,
            result: "lost"
          })
        }
      }
      // Post game and stats
      // Php will generate game id, and add it to all stats
      await fetch('API/stats/post.php', {
        method: 'POST',
        body: JSON.stringify({
          format: this.game.mode,
          stats: stats,
        })
      })
    }
  },
  watch: {},
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