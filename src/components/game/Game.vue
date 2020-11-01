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
      if (!this.game.teams.length)
        return 20
      return this.game.teams.reduce((max, team)=>max.life.val<team.life.val?max:team).life.val
    },
    high() {
      if (!this.game.teams.length)
        return 20
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
      return "start"
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
      this.music = {
        intro: "music/dream/1.mp3",
        gain: "music/dream/5.mp3",
        start: "music/dream/2.mp3",
        mid: "music/dream/5.mp3",
        late: "music/dream/4.mp3",
      }
      this.track = "intro"
      let url = this.music[this.track]
      this.source = await window.audiosys.play(url)
      this.source.onEnd(this.loopMusic.bind(this))
    },
    async loopMusic() {
      console.log("to "+this.musicState)
      this.track = this.musicState
      let url = this.music[this.track]
      this.source = await window.audiosys.play(url)
      this.source.loop = true
      this.source.onEnd(this.loopMusic.bind(this))
    },
    async endGame() {
      this.source.onEnd(null)
      this.source.fade(0.01,2)
      await window.sleep(2)
      this.source.stop()
      this.source = null
      //write stats
    }
  },
  watch: {
    musicState(val) {
      if (!this.source)
        return
      console.log("go "+val)
      this.source.loop = false
    }
  },
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