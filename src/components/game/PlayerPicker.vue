<template>
  <v-menu offset-y>
    <template v-slot:activator="{attrs, on}">
      <v-btn icon
        v-bind="attrs"
        v-on="on">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(u, i) in users" :key="i"
        @click="$emit('add-player',u)">
        <v-list-item-avatar>
          <Card class="icon" :image="u.img"/>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="u.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import Card from '../ui/Card';
export default {
  name: 'mTeamPicker',
  components: {Card},
  props: {},
  //data: ()=>({}),
  computed: {
    users() {
      return this.$root.users
    }
  },
  //methods: {},
  //watch: {},
}
</script>

<style>
</style>
