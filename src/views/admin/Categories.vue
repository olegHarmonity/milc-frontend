<template>
  <div id="admin-categories" class="page">
    <!-- Header -->
    <v-row class="page-header">
      <v-col cols="12" md="auto">
        <h1 class="page-title">{{ $t("categories.title") }}</h1>
      </v-col>

      <v-col class="text-right d-flex justify-end">
        <CategoryDialog
          :buttonText="$t('buttons.addCategory')"
          :buttonAttrs="{
            color: 'primary',
          }"
        />
      </v-col>
    </v-row>

    <!-- Loader -->
    <spinner
      v-if="$store.getters['movieGenres/loading'].fetchAll"
      large
      center
    />

    <!-- No data text -->
    <p class="mt-10" v-else-if="!$store.getters['movieGenres/items'].length">
      {{ $t("common.noDataAvailable") }}
    </p>

    <!-- Category listing -->
    <v-row v-else>
      <v-col
        v-for="item in $store.getters['movieGenres/items']"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <CategoryItem :category="item" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CategoryItem from "@/components/admin/categories/CategoryItem.vue";
import CategoryDialog from "@/components/admin/categories/CategoryDialog.vue";

export default {
  components: { CategoryItem, CategoryDialog },

  created() {
    this.$store.dispatch("movieGenres/fetchAll");
  },
};
</script>

<style></style>
