<template>
  <v-dialog max-width="300"
    v-model="open">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon
        v-bind="attrs"
        v-on="on">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Select a user to add
      </v-card-title>
      <v-list>
        <v-list-item v-for="(u, i) in users" :key="i"
          @click="add(u)">
          <v-list-item-avatar>
            <Card class="icon" :image="u.img"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="u.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import Card from '../ui/Card';
export default {
  name: 'mTeamPicker',
  components: {Card},
  //props: {},
  data: ()=>({
    open: false,
  }),
  computed: {
    users() {
      return this.$root.users
    }
  },
  methods: {
    add(user) {
      this.$emit('add-player',user)
      this.open = false
    }
  },
  //watch: {},
}
</script>

<style>
</style>
