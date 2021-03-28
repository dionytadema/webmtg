<template>
  <div class="deck">
      <Card :image="deck.img"/>
      <div class="data">
        <span class="title">{{deck.name}}</span>
        <Color :color="deck.color"/>
        <span class="owner">{{deck.format}}</span>
        <span class="owner">By: {{deck.owner}}</span>
        <v-btn icon
          @click="del">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
  </div>
</template>

<script>
import Card from '../ui/Card';
import Color from '../ui/Color';
export default {
  name: 'Deck',
  components: {Card, Color},
  props: {
    deck: Object,
  },
  methods: {
    async del() {
      //this.$root.decks = this.$root.decks.filter(d=>{return d.id!=this.deck.id})
      let res = await fetch('API/decks/del.php', {
        method: 'POST',
        body: JSON.stringify({id: this.deck.id})
      })
      if (res.status==200) {
        this.$emit('deleted', this.deck.id)
      }
    }
  }
}
</script>

<style>
  .deck {
    width: 400px;
    margin: 8px;
    padding: 4px;
    display: flex;
    background: #444;
    border-radius: 8px;
  }

  .data {
    margin-left: 8px;
  }
</style>
