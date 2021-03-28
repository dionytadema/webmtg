<template>
  <div class="deck">
    <div class="data">
      <Card class="full small"
        :image="img"/>
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
      <v-select class="my-3"
          dense hide-details
          label="By:"
          v-model="owner"
          :items="users"
          item-text="name"
          item-value="id"/>
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
    users: [],
    // New deck
    owner: 0,
    name: "New deck",
    color: "cgrubw",
    format: "Casual",
    img: 0,
  }),
  //computed: {},
  methods: {
    clear() {
      this.name = "New deck"
      this.color = "cgrubw"
      this.format = "Casual"
      this.img = 0
      this.owner = 0
    },
    async addDeck() {
      let deck = {
        name: this.name,
        color: this.color,
        format: this.format,
        img: this.img,
        owner: this.owner,
      }
      let res = await fetch('API/decks/add.php', {
        method: 'POST',
        body: JSON.stringify(deck)
      })
      if (res.status==200) {
        let id = await res.json()
        deck.id = id
        // Set the name
        deck.owner = this.users.find(u=>{return u.id==deck.owner}).name
        // No longer need to push to local storage
        //this.$root.decks.push(deck)
        // instead we emit an added event
        this.$emit('added', deck)
      }
      this.clear()
    }
  },
  //watch: {},
  async mounted() {
    let res = await fetch('API/users/get.php')
    this.users = await res.json()
  },

}
</script>

<style></style>