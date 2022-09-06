<template>
  <v-app-bar id="app-header-large" app absolute height="130" elevation="0">
    <v-container>
      <v-row>
        <!-- Left -->
        <v-col cols="1" class="d-flex align-center">
          <!-- Back button -->
          <v-btn icon @click="$goBack()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>

        <!-- Center -->
        <v-col>
          <!-- Logo -->
          <v-img
            :src="require('@/assets/logos/3d-logo-text-240.png')"
            alt="MILC Platform"
            width="110"
            max-width="110"
            class="mx-auto cursor-pointer"
            @click="$router.push({ name: 'home' })"
          />
        </v-col>

        <!-- Right -->
        <v-col cols="1" class="d-flex align-center justify-end">
          <v-app-bar-nav-icon @click="$emit('toggle-nav')" />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style lang="scss">
#app-header-large {
  background-color: $app-background;
}
</style>
