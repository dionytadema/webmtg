<template>
  <div class="users">
    <AddUser
      @added="added"/>
    <User v-for="u in users" :key="u.id" :user="u"/>
  </div>
</template>

<script>
import AddUser from './AddUser';
import User from './User';
export default {
  name: 'Users',
  components: {
    AddUser,
    User,
  },
  //props: {},
  data: () => ({
    active: false,
    users: [],
  }),
  methods: {
    added(user) {
      this.users.push(user)
    },
    deleted(id) {
      console.log(`removing ${id}`)
      let idx = this.users.map(d=>d.id).indexOf(id)
      this.users.splice(idx, 1);
    },
  },
  //watch: {},
  async mounted() {
    let res = await fetch('API/users/get.php')
    this.users = await res.json()
  },
}
</script>

<style>
  .users {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
</style>