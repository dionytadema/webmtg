<template>
  <v-btn class="mx-2"
    @click="add"
    fab>
    <v-icon dark>
      mdi-plus
    </v-icon>
  </v-btn>
</template>

<script>
import Team from '@/classes/Team';
import Player from '@/classes/Player';
export default {
  name: 'AddTeam',
  //components: {},
  //props: {},
  data: () => ({
    name: "Nieuw Team",
    color: "#444",
  }),
  //computed: {},
  methods: {
    clear() {
      this.name = "Nieuw Team"
      this.color = "#444"
    },
    add() {
      let user = this.$root.users[Math.floor((Math.random()*this.$root.users.length))]
      let deck = this.$root.decks[Math.floor((Math.random()*this.$root.decks.length))]
      // Add player
      let player = new Player(user,deck)
      let team = new Team()
      team.players.push(player)
      this.$root.game.teams.push(team) 
      this.clear()
    }
  }
  //watch: {}
}
</script>

<style>
</style>
