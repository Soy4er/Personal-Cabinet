<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <form v-if="!$store.state.authUser" @submit.prevent="login">
      <p v-if="formError" class="error">{{ formError }}</p>
      <p><i>To login, use <b>demo</b> as username and <b>demo</b> as password.</i></p>
      <p>Username: <input v-model="formUsername" type="text" name="username"></p>
      <p>Password: <input v-model="formPassword" type="password" name="password"></p>
      <button type="submit">Login</button>
    </form>
    <div v-else>
      <p>You are already logged in! You can return to your personal account or log out.</p>
      <nuxt-link to="/account/demo">Account</nuxt-link>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formError: null,
      formUsername: '',
      formPassword: '',
      title: !this.$store.state.authUser ? 'Please log in to your account' : `Hello ${this.$store.state.authUser.username}!`
    }
  },
  methods: {
    async login () {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        })
        this.$router.push({name: 'account-name', params: {name: this.formUsername}})
      } catch (e) {
        this.formError = e.message
      }
    },
    async logout () {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

<style>
.container {
  padding: 100px;
}
.error {
  color: red;
}
</style>
