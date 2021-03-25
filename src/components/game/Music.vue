<template>
  <div/>
</template>

<script>
export default {
  name: 'mMusic',
  //components: {},
  props: {game: Object},
  //data: ()=>({}),
  computed: {
    teams() {
      return this.game.teams
    },
    teamsAlive() {
      return this.teams.filter(t=>t.alive)
    },
    teamsAlivePercent() {
      return this.teamsAlive.length/this.teams.length
    },
    high() {
      return this.teamsAlive.reduce((max, team)=>
        max.life.val>team.life.val?max:team,
        {life:{val:20}}
      ).life.val
    },
    highP() {
      return this.teamsAlive.reduce((max, team)=>
        max.health()>team.health()?max:team,
        {health:()=>0}
      ).health()
    },
    low() {
      return this.teamsAlive.reduce((max, team)=>
        max.life.val<team.life.val?max:team,
        {life:{val:20}}
      ).life.val
    },
    lowP() {
      return this.teamsAlive.reduce((min, team)=>
        min.health()<team.health()?min:team,
        {health:()=>1}
      ).health()
    },
    avg() {
      return this.teamsAlive.reduce((v, t)=>
        v+t.life.val,
        0
      )/this.teamsAlive.length || 0
    },
    avgP() {
      return this.teamsAlive.reduce((v, t)=>
        v+t.health(),
        0
      )/this.teamsAlive.length || 0
    },
    dev() {
      return Math.sqrt(
        this.teamsAlive.reduce((v, t)=>{
            let d = t.life.val-this.avg
            return v+(d*d)
          },
          0
        )/this.teamsAlive.length
      ) || 0
    },
    state() {
      return {
        main: this.teamsAlive.length>0,
        high: 0.5<this.lowP && this.lowP<0.9,
        mid:  0.3<this.lowP && this.lowP<0.7,
        low: 0<this.lowP && this.lowP<0.5,
        gain: this.highP>1.2,
        lose: this.dev>3
      }
    }
  },
  //methods: {},
  watch: {
    state(s) {
      this.game.music.set(s)
    }
  },
}
</script>

<style></style>
