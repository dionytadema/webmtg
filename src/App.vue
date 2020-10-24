<template>
  <v-app dark>
    <NavBar/>
    <v-main class="main">
      <Start v-if="$root.path=='load'"/>
      <Game v-if="$root.path=='play'"/>
      <Users v-if="$root.path=='user'"/>
      <Decks v-if="$root.path=='deck'"/>
    </v-main>
  </v-app>
</template>

<script>
import Start from './components/Start';
import NavBar from './components/NavBar';
import Game from './components/game/Game';
import Users from './components/users/Users';
import Decks from './components/decks/Decks';

export default {
  name: 'App',

  components: {
    Start,
    NavBar,
    Game,
    Users,
    Decks,
  },
  data: () => ({}),
};
</script>

<style>
/*Custom scroll bar*/
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}
::-webkit-scrollbar-track {
  background-color: #222;
}
::-webkit-scrollbar-corner{
  background: none;
}
::-webkit-scrollbar-thumb {
  background-color: #666;
  border-radius: 6px;
}
</style>