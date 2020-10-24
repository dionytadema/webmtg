<template>
  <div class="users">
    <div>
      hey, welcome to the users edit page!
    </div>
    <User v-for="(u, i) in $root.users" :key="i" v-bind="u"/>
  </div>
</template>

<script>
import User from './User';
export default {
  name: 'Users',
  components: {
    User,
  },
  //props: {},
  data: () => ({}),
  //computed: {},
  //methods: {},
  //watch: {},
}
</script>

<style>
  .users {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
</style>