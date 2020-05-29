<template>
  <div class="bg">
    <div class="authorial">
      <div class="authorial-header">
        <h1 class="authorial-header__title">Account Login</h1>
        <p class="authorial-header__subtitle">{{!authUser ? 'Log in to take full advantage of the service' : `Hello ${this.$store.state.authUser.username}! You are already authorized and can use all the features of your personal account.`}}</p>
      </div>
      <form class="authorial-form" v-if="!authUser" @submit.prevent="login">
        <input v-model="formUsername" type="text" name="username" class="authorial-form__input" placeholder="Username">
        <input v-model="formPassword" type="password" name="password" class="authorial-form__input" placeholder="Password">
        <button type="submit" class="authorial-form__submit btn btn--primary">Login</button>
      </form>
      <div class="authorial-buttons" v-else>
        <button class="btn mr-20" @click="logout">Logout</button>
        <nuxt-link class="btn btn--primary" to="/account/demo">Account</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  head: {
    title: 'Вход в личный кабинет'
  },
  data () {
    return {
      formUsername: '',
      formPassword: '',
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
        this.$toast.success(e.message)
      }
    },
    async logout () {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.$toast.success(e.message)
      }
    }
  },
  ...mapGetters({
    authUser: "index/SET_USER"
  }),
}
</script>

<style lang="scss" scoped>
.authorial {
  background-color: $gray-700;
  box-shadow: 0px 4px 30px rgba(23, 24, 26, 0.85);
  border-radius: 10px;
  border: 1px solid $gray-500;
  width: 500px;
  padding: 60px 70px;
  color: $white;
  text-align: center;
  &-header {
    margin-bottom: 30px;
    &__title {
      font-size: $font-size-md;
      font-family: $font-family-add;
      font-weight: normal;
    }
    &__subtitle {
      font-size: $font-size-base;
      font-family: $font-family-base;
      font-weight: normal;
    }
  }
  &-form {
    &__input {
      background-color: $black !important;
      border-radius: 2px;
      border: none;
      box-shadow: none;
      width: 100%;
      padding: 11px 20px;
      margin-top: 20px;
      &:first-child {
        margin-top: 0;
      }
    }
    &__submit {
      margin-top: 20px;
    }
  }
  &-buttons {
    display: flex;
  }
}
.bg {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(0deg, rgba(30, 31, 35, 0.9), rgba(30, 31, 35, 0.9)), url('~assets/images/bg_auth.jpg'), $black;
}
</style>
