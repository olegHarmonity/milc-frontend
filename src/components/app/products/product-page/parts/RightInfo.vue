<template>
  <div class="right-info item-group first-border-none">
    <div class="item">
      <span class="key">{{ $t("labels.title") }}:</span>
      <span class="value">
        {{ right.title }}
      </span>
    </div>

    <div class="item">
      <span class="key">{{ $t("labels.availableFrom") }}:</span>
      <span class="value">
        {{ $dayjs(right.available_from_date).format("DD.MM.YYYY") }}
      </span>
    </div>

    <div class="item">
      <span class="key">{{ $t("labels.availableUntil") }}:</span>
      <span class="value">
        {{ $dayjs(right.expiry_date).format("DD.MM.YYYY") }}
      </span>
    </div>

    <div class="item">
      <span class="key">{{ $t("labels.availableRights") }}:</span>
      <span class="value">
        <v-chip
          v-for="item in right.available_rights"
          :key="item.id"
          class="chip-transparent mr-3 my-1"
        >
          {{ item.name }}
        </v-chip>
      </span>
    </div>

    <div v-if="full" class="item">
      <span class="key">{{ $t("labels.holdback") }}:</span>
      <span class="value">
        {{ right.holdbacks }}
      </span>
    </div>

    <div class="item">
      <span class="key">{{ $t("labels.territory") }}:</span>
      <span class="value">
        {{ right.territories.territory.join(", ") }}
      </span>
    </div>

    <div class="item">
      <span class="key">{{ $t("labels.shortDescription") }}:</span>
      <span class="value">
        {{ right.short_description }}
      </span>
    </div>

    <div v-if="full" class="item">
      <span class="key">{{ $t("labels.longDescription") }}:</span>
      <span class="value">
        {{ right.long_description }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    right: {
      type: Object,
      required: true,
    },
    full: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
