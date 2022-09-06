<template>
  <div class="user-overview">
    <v-img
      :src="logo"
      @error="user.image.image_url = $placeholderImage('150x150')"
      width="150"
      height="150"
      class="rounded-lg"
      alt="Image"
      contain
    />

    <!-- Info -->
    <h2 class="mt-7 mb-1">{{ $t("labels.user") }}</h2>
    <div class="item-group">
      <div class="item">
        <span class="key">{{ $t("labels.firstName") }}</span>
        <span class="value">{{ user.first_name }}</span>
      </div>

      <div class="item">
        <span class="key">{{ $t("labels.lastName") }}</span>
        <span class="value">{{ user.last_name }}</span>
      </div>

      <div class="item">
        <span class="key">{{ $t("labels.jobTitle") }}</span>
        <span class="value">{{ user.job_title }}</span>
      </div>

      <div class="item">
        <span class="key">{{ $t("labels.address") }}</span>
        <span class="value">{{ $fullAddress(user) }}</span>
      </div>
    </div>

    <!-- Contact -->
    <h3 class="mt-7 mb-1">{{ $t("labels.contact") }}</h3>
    <div class="item-group">
      <div class="item">
        <span class="key">{{ $t("labels.email") }}</span>
        <a class="value basic-link" :href="'mailto:' + user.email"
          >{{ user.email }}
        </a>
      </div>

      <div class="item">
        <span class="key">{{ $t("labels.phone") }}</span>
        <a class="value basic-link" :href="'tel:' + user.phone_number"
          >{{ user.phone_number }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  computed: {
    logo() {
      return this.user.image?.image_url || this.$placeholderImage("150x150");
    },
  },
};
</script>

<style></style>
