<template>
  <v-navigation-drawer
    app permanent touchless
    expand-on-hover>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="../assets/logo.png"/>
        </v-list-item-avatar>
        <v-list-item-title>Web Magic 2020</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider/>
    <v-list
      nav dense>
      <v-list-item v-for="n in nav" :key="n.t" link
        @click="$root.path=n.l">
        <v-list-item-icon>
          <v-icon>mdi-{{n.i}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{n.t}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavBar',
  //components: {},
  props: {
    path: String,
  },
  data: () => ({
    nav: [
      {t:"Play", i:"play", l:"play"},
      {t:"Decks", i:"cards", l:"deck"},
      {t:"Players", i:"account-multiple",  l:"user"},
      {t:"Stats", i:"chart-box", l:"stat"},
      {t:"Music", i:"music", l:"sound"},
      {t:"Settings", i:"cog", l:"cnfg"},
    ]
  }),
  //computed: {},
  //methods: {},
  //watch: {},
}
</script>
