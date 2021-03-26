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
      this.img = 0
      //this.owner = null,
    },
    async addDeck() {
      let deck = {
        name: this.name,
        color: this.color,
        format: this.format,
        img: this.img,
        // Owner should become a ID
        //owner: this.owner,
      }
      let res = await fetch('API/decks/add.php', {
        method: 'POST',
        body: JSON.stringify(deck)
      })
      if (res.status==200) {
        let id = await res.json()
        deck.id = id
        // No longer need to push to local storage
        //this.$root.decks.push(deck)
        // instead we emit an added event
        this.$emit('added', deck)
      }
      this.clear()
    }
  }
  //watch: {},
}
</script>

<style></style>