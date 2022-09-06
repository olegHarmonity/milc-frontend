<template>
  <v-dialog v-model="dialog" width="500">
    <!-- Button -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="{ attrs, ...buttonAttrs }"
        v-on="on"
        @click="
          dialog = true;
          $emit('click');
        "
      >
        <v-icon v-if="buttonIcon" left>
          {{ buttonIcon }}
        </v-icon>

        {{ buttonText || $t("buttons.addUser") }}
      </v-btn>
    </template>

    <!-- Card -->
    <v-card>
      <!-- Tabs -->
      <v-tabs
        v-model="tab"
        v-if="user"
        background-color="transparent"
        color="white"
      >
        <v-tab>{{ $t("buttons.user") }}</v-tab>
        <v-tab>{{ $t("buttons.viewActivity") }}</v-tab>
      </v-tabs>

      <!-- Content -->
      <v-card-text class="pt-5 pb-0">
        <v-tabs-items v-model="tab">
          <!-- User form -->
          <v-tab-item>
            <v-form v-model="formValid" ref="form" autocomplete="off">
              <UserForm
                v-model="formData"
                :is-update="!!user"
                :as-admin="$isAdmin($user)"
              />

              <api-response :response="formResponse" />
            </v-form>
          </v-tab-item>

          <!-- Activity -->
          <v-tab-item>
            <Activity :user="user" />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>

      <v-divider></v-divider>

      <!-- Actions -->
      <v-card-actions>
        <v-spacer></v-spacer>

        <!-- Cancel -->
        <v-btn text @click="cancel" class="mr-3">
          {{ $t("buttons.cancel") }}
        </v-btn>

        <!-- Save -->
        <v-btn
          color="primary"
          @click="save"
          :disabled="!formValid"
          :loading="
            $store.getters['users/loading'].create ||
            !!$store.getters['users/loading'].update
          "
          class="px-10"
        >
          {{ $t("buttons.save") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UserForm from "./UserForm.vue";
import Activity from "./Activity.vue";

export default {
  components: { UserForm, Activity },

  props: {
    user: {
      type: Object,
      required: false,
    },
    buttonText: {
      type: String,
      required: false,
    },
    buttonAttrs: {
      type: Object,
      required: false,
    },
    buttonIcon: {
      type: String,
      default: "mdi-plus",
    },
  },

  data() {
    return {
      tab: 0,
      dialog: false,
      formData: {},
      formValid: false,
      formResponse: null,
    };
  },

  watch: {
    dialog(val) {
      if (val) {
        if (this.user) {
          this.formData = this.$deepCopy(this.user);
        }
      }
    },
  },

  methods: {
    save() {
      this.user ? this.updateUser() : this.createUser();
    },

    cancel() {
      if (!this.user) {
        this.$refs.form.reset();
      }

      this.dialog = false;
      this.tab = 0;
    },

    createUser() {
      this.formResponse = null;
      this.$store
        .dispatch(`users/create`, this.formData)
        .then((data) => {
          this.cancel();
          this.$toast.success(data.message);
        })
        .catch((resp) => {
          this.formResponse = resp.data;
        });
    },

    updateUser() {
      const data = {
        id: this.user.id,
        ...this.$diff(this.user, this.formData),
      };

      this.formResponse = null;
      this.$store
        .dispatch(`users/update`, data)
        .then((data) => {
          this.cancel();
          this.$toast.success(data.message);
        })
        .catch((resp) => {
          this.formResponse = resp.data;
        });
    },
  },
};
</script>
