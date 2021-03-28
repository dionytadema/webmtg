<template>
  <v-dialog max-width="400"
    v-model="open">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon
        v-bind="attrs"
        v-on="on">
        <v-icon>mdi-cards</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Select a deck to use
      </v-card-title>
      <v-list>
        <v-list-item v-for="d in decks" :key="d.id"
          @click="set(d)">
          <v-list-item-avatar>
            <Card class="icon" :image="d.img"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="d.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import Card from '../ui/Card';
export default {
  name: 'mDeckPicker',
  components: {Card},
  //props: {},
  data: ()=>({
    open: false,
    decks: []
  }),
  //computed: {},
  methods: {
    set(deck) {
      this.$emit('set-deck',deck)
      this.open = false
    }
  },
  //watch: {},
  async mounted() {
    let res = await fetch('API/decks/get.php')
    this.decks = await res.json()
  },
}
</script>

<style></style>
