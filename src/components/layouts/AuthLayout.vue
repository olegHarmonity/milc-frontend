<template>
  <v-app class="auth-layout">
    <v-main class="my-10 align-center">
      <v-container>
        <v-row>
          <v-col cols="col" lg="10" xl="6" class="mx-auto">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
.auth-layout {
  background: url("../../assets/images/Background_01.jpg") center center !important;
  background-repeat: no-repeat;
  background-size: cover !important;
}
</style>
