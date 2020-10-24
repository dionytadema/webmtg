<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img class="my-3"
          contain
          height="200"
          :src="require('../assets/logo.png')"/>
      </v-col>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Web Magic 2020</h1>
        <p class="subheading font-weight-regular">
          A new and advanced tool to track your magic games
          <br>with a lifecounter, stats, matchmaking and more</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Start',
  //components: {},
  //props: {},
  //data: ()=>({}),
  //computed: {},
  //methods: {},
  //watch: {},
}
</script>
