<template>
  <div class="breadcrumbs">
    <nuxt-link to="/">Log personal cabinet</nuxt-link>
    <span>/</span>
    <span>Personal cabinet</span>
  </div>
</template>

<style lang="scss" scoped>
  .breadcrumbs {
    color: $white;
    & a {
      color: $primary;
      border-bottom: 1px solid $primary;
    }
  }
</style>