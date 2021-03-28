<template>
 <div class="deck">
    <div class="data">
      <Card :image="img"/>
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
      <v-btn 
        @click="addDeck">
        add</v-btn>
    </div>
  </div>
</template>

<script>
import Card from '../ui/Card';
export default {
  name: 'AddUser',
  components: {Card},
  //props: {},
  data: () => ({
    name: "",
    img: 0,
  }),
  //computed: {},
  methods: {
    clear() {
      this.name = ""
      this.img = 0
    },
    async addDeck() {
      let user = {
        name: this.name,
        img: this.img,
      }
      let res = await fetch('API/users/add.php', {
        method: 'POST',
        body: JSON.stringify(user)
      })
      if (res.status==200) {
        let id = await res.json()
        user.id = id
        this.$emit('added', user)
      }
      this.clear()
    }
  }
  //watch: {},
}
</script>

<style></style>
