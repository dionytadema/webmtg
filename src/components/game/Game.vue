<template>
  <div class="play">
    <div class="toolbar">
      <v-select class="mx-2"
        v-model="game.mode"
        :items="['casual','commander','headedgiant']"/>
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
    <mTeam v-for="(t, i) of game.teams" :key="i" :team="t" :i="i"/>
    <mPlayer v-for="(p, i) of game.players" :key="i" :player="p"/>
  </div>
</template>

<script>
import mPlayer from './Player';
import mTeam from './Team';
import Team from '@/classes/Team';
export default {
  name: 'Game',
  components: {mPlayer, mTeam},
  //props: {},
  //data: ()=>({}),
  data: () => ({
    music: {},
    track: null,
  }),
  computed: {
    game() {
      return this.$root.game
    },
    low() {
      return this.game.teams.reduce((max, team)=>max.life.val<team.life.val?max:team).life.val
    },
    high() {
      return this.game.teams.reduce((max, team)=>max.life.val>team.life.val?max:team).life.val
    },
    musicState() {
      let high = this.high
      let low = this.low
      if (high-low==0)
        return "start"
      if (high>30)
        return "gain"
      if (low<8)
        return "late"
      if (low<2)
        return "end"
      if (high-low>5)
        return "mid"
      return "normal"
    }
  },
  methods: {
    addTeam() {
      this.game.teams.push(new Team()) 
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
      this.startMusic()
    },
    startMusic() {
      this.music = {
        intro: new Audio("music/dream/1.mp3"),
        gain: new Audio("music/dream/5.mp3"),
        start: new Audio("music/dream/2.mp3"),
        mid: new Audio("music/dream/5.mp3"),
        late: new Audio("music/dream/4.mp3"),
      }
      this.track = "intro"
      this.music[this.track].onended = this.loopMusic.bind(this)
      this.music[this.track].play()
      //TODO: use this.music to fade or switch music state
    },
    loopMusic() {
      this.music[this.track].onended = null
      this.track = this.musicState
      this.music[this.track].onended = this.loopMusic.bind(this)
      this.music[this.track].play()
    },
    endGame() {
      this.music[this.track].pause()
      this.music[this.track].currentTime = 0
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