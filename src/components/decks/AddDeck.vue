<template>
  <div class="deck">
    <div class="data">
      <Card class="full small"
        :image="Number(img)"/>
      <v-text-field
        type="number"
        label="Image (multiverse id)"
        v-model.number="img"/>
    </div>
    <div class="data">
      <v-text-field class="my-2"
        dense hide-details single-line
        label="Name"
        v-model="name"/>
      <v-text-field class="my-2"
        hide-details
        label="Colors"
        v-model="color"/>
      <Color class="small"
        :color="color"/>
      <v-select class="my-2"
        hide-details
        label="Format"
        v-model="format"
        :items="['Casual','Commander']"/>
      <v-select class="my-2"
        dense hide-details
        label="Door:"
        v-model="owner"
        :items="this.$root.users.map(u => u.name)"/>
      <v-btn 
        @click="addDeck">
        add</v-btn>
    </div>
  </div>
</template>

<script>
import Card from '../ui/Card';
import Color from './../ui/Color';
export default {
  name: 'AddDeck',
  components: {Card, Color},
  //props: {},
  data: () => ({
    name: "Nieuw Deck",
    color: "cgrubw",
    owner: null,
    format: "Casual",
    img: 0,
  }),
  //computed: {},
  methods: {
    clear() {
      this.name = "Nieuw Deck"
      this.color = "cgrubw",
      this.format = "Casual",
      this.owner = null,
      this.img = 0
    },
    addDeck() {
      this.$root.decks.push({
        id: window.newId(),
        name: this.name,
        color: this.color,
        img: this.img,
        owner: this.owner,
      })
      this.clear()
    }
  }
  //watch: {},
}
</script>

<style></style>