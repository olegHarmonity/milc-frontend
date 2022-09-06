<template>
  <v-card class="category-item d-flex flex-column h-100">
    <v-img :src="image" height="180" max-height="180"></v-img>

    <v-card-title class="flex-grow-1">
      <v-row>
        <v-col>
          {{ category.name }}
        </v-col>
        <v-col cols="auto">
          <v-menu v-model="menu" bottom left close-on-click offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>

            <v-card width="150">
              <!-- Edit -->
              <CategoryDialog
                :category="category"
                :buttonText="$t('buttons.edit')"
                buttonIcon="mdi-pencil-outline"
                :buttonAttrs="{
                  class: 'btn-justify-left',
                  block: true,
                  color: 'transparent',
                }"
                @click="menu = false"
              />

              <!-- Delete -->
              <confirm-dialog
                :button-text="$t('buttons.delete')"
                button-icon="mdi-trash-can-outline"
                :button-attrs="{
                  class: 'btn-justify-left',
                  block: true,
                  color: 'transparent',
                  loading:
                    $store.getters['movieGenres/loading'].delete == category.id,
                }"
                @confirm="deleteCategory"
              />
            </v-card>
          </v-menu>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <div>
        {{ $t("labels.products") }}:
        <span style="color: white">{{ category.product_count }}</span>
      </div>
      <div>
        {{ $t("labels.hits") }}:
        <span style="color: white">{{ category.number_of_clicks }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import CategoryDialog from "./CategoryDialog.vue";

export default {
  components: { CategoryDialog },

  props: {
    category: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    menu: false,
  }),

  computed: {
    image() {
      return (
        this.category.image?.image_url ||
        "https://via.placeholder.com/300x150/555555?text=MILC%20Platform"
      );
    },
  },

  methods: {
    deleteCategory() {
      this.$store
        .dispatch("movieGenres/delete", this.category.id)
        .then((data) => {
          this.$toast.success(data.message || this.$t("common.success"));
        })

        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },
  },
};
</script>

<style lang="scss"></style>
