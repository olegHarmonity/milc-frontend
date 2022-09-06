<template>
  <footer class="footer text-center py-5" style="font-size: 12px">
    Welt der Wunder &copy; Copyright {{ $dayjs().format("YYYY") }}, All Rights
    Reserved
    <div>
      <router-link class="basic-link px-3" :to="{ name: 'impressum' }"
        >Impressum</router-link
      >
      &bull;
      <router-link class="basic-link px-3" :to="{ name: 'datenschutz' }"
        >Datenschutz</router-link
      >
      &bull;
      <router-link class="basic-link px-3" :to="{ name: 'agb' }"
        >AGB</router-link
      >
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footer {
  color: var(--v-secondary-lighten5);

  a {
    color: var(--v-secondary-lighten5) !important;
  }
}
</style>
