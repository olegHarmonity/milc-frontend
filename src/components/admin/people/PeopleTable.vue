<template>
  <v-data-table
    class="people-table"
    :headers="headers"
    :items="$store.getters['people/items']"
    :items-per-page.sync="per_page"
    :page.sync="page"
    :loading="$store.getters['people/loading'].fetchAll"
    :server-items-length="$store.getters['people/total']"
    :footer-props="$config.vDataTable.footerProps"
    @update:page="fetchData"
    @update:items-per-page="fetchData"
    disable-sort
  >
    <!-- Image -->
    <template v-slot:item.image="{ item }">
      <v-avatar>
        <img :src="getPersonImage(item)" alt="Image" />
      </v-avatar>
    </template>

    <!-- Name -->
    <template v-slot:item.name="{ item }">
      {{ $fullName(item) }}
    </template>

    <!-- Actions -->
    <template v-slot:item.actions="{ item }">
      <v-menu v-model="menu[item.id]" bottom left close-on-click offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div class="text-right">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </div>
        </template>

        <v-card width="150">
          <!-- Edit -->
          <PeopleDialog
            :person="item"
            :buttonText="$t('buttons.edit')"
            button-icon="mdi-pencil-outline"
            :button-attrs="{
              class: 'btn-justify-left',
              block: true,
              color: 'transparent',
            }"
            @click="menu[item.id] = false"
          />

          <!-- Delete -->
          <confirm-dialog
            :button-text="$t('buttons.delete')"
            button-icon="mdi-trash-can-outline"
            :button-attrs="{
              class: 'btn-justify-left',
              block: true,
              color: 'transparent',
              loading: $store.getters['people/loading'].delete === item.id,
            }"
            @confirm="deletePerson(item)"
          />
        </v-card>
      </v-menu>
    </template>
  </v-data-table>
</template>

<script>
import i18n from "@/plugins/i18n";
import PeopleDialog from "./PeopleDialog.vue";

export default {
  components: { PeopleDialog },

  props: {
    search: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    per_page: 10,
    page: 1,
    menu: {},
  }),

  computed: {
    headers() {
      return [
        {
          text: "",
          sortable: false,
          value: "image",
          width: "60px",
        },
        {
          text: i18n.t("labels.name"),
          sortable: false,
          value: "name",
        },
        {
          text: "",
          sortable: false,
          value: "actions",
          width: "100px",
        },
      ];
    },
  },

  watch: {
    search() {
      this.fetchData();
    },
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.$store.dispatch("people/fetchAll", {
        page: this.page,
        per_page: this.per_page,
        "search[full_name]": this.search,
      });
    },

    deletePerson(person) {
      this.$store
        .dispatch("people/delete", person.id)
        .then((data) => {
          this.$toast.success(data.message);
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },

    getPersonImage(person) {
      return person.image?.image_url || this.$placeholderImage("50x50", "MILC");
    },
  },
};
</script>
