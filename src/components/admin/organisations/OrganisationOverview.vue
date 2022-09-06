<template>
  <div class="organisation-overview" :class="{ 'client-app': !adminOrg }">
    <div class="organisation-logo-name">
      <v-img
        :src="logo"
        @error="organisation.logo.image_url = $placeholderImage('150x150')"
        width="150"
        :height="!adminOrg ? 160 : 150"
        class="rounded-lg"
        :alt="organisation.organisation_name"
        contain
      />
      <h1 class="org-name" v-if="!adminOrg">
        {{ organisation.organisation_name }}
      </h1>
    </div>
    <div class="organisation-informations">
      <!-- Info -->
      <div>
        <h2 class="mt-7 mb-1">Organisation</h2>
        <div class="item-group">
          <div class="item">
            <span class="key">{{ $t("labels.name") }}</span>
            <span class="value">{{ organisation.organisation_name }}</span>
          </div>

          <div class="item">
            <span class="key">{{ $t("labels.role") }}</span>
            <span class="value">
              {{
                organisation.organisation_role == "both"
                  ? $t("org.buyerAndSeller")
                  : $t("org." + organisation.organisation_role)
              }}
            </span>
          </div>

          <div class="item">
            <span class="key">{{ $t("labels.type") }}</span>
            <span class="value">{{ organisation.organisation_type.name }}</span>
          </div>

          <div class="item">
            <span class="key">{{ $t("labels.address") }}</span>
            <span class="value">{{ $fullAddress(organisation) }}</span>
          </div>

          <div class="item">
            <span class="key">{{ $t("labels.registrationNumber") }}</span>
            <span class="value">{{ organisation.registration_number }}</span>
          </div>

          <div class="item">
            <span class="key">{{ $t("labels.description") }}</span>
            <span class="value">{{ organisation.description }}</span>
          </div>
        </div>
      </div>
      <!-- Contact -->
      <div>
        <h3 class="mt-7 mb-1">{{ $t("labels.contact") }}</h3>
        <div class="item-group">
          <div class="item">
            <span class="key">{{ $t("labels.email") }}</span>
            <a class="value basic-link" :href="'mailto:' + organisation.email"
              >{{ organisation.email }}
            </a>
          </div>

          <div class="item">
            <span class="key">{{ $t("labels.phone") }}</span>
            <a
              class="value basic-link"
              :href="'tel:' + organisation.phone_number"
              >{{ organisation.phone_number }}
            </a>
          </div>

          <div class="item">
            <span class="key">{{ $t("labels.telephone") }}</span>
            <a
              class="value basic-link"
              :href="'tel:' + organisation.telephone_number"
              >{{ organisation.telephone_number }}
            </a>
          </div>
        </div>
      </div>

      <!-- Links -->
      <div>
        <h3 class="mt-7 mb-1">{{ $t("labels.links") }}</h3>
        <div class="item-group">
          <div class="item">
            <span class="key">{{ $t("labels.website") }}</span>
            <a
              class="value basic-link"
              :href="'//' + organisation.website_link"
              target="_blank"
              >{{ organisation.website_link }}
            </a>
          </div>

          <div class="item">
            <span class="key">{{ $t("labels.linkedin") }}</span>
            <a
              class="value basic-link"
              :href="'//' + getSocialLink('linkedin')"
              target="_blank"
              >{{ getSocialLink("linkedin") }}
            </a>
          </div>

          <div class="item">
            <span class="key">{{ $t("labels.facebook") }}</span>
            <a
              class="value basic-link"
              :href="'//' + getSocialLink('facebook')"
              target="_blank"
              >{{ getSocialLink("facebook") }}
            </a>
          </div>

          <div class="item">
            <span class="key">{{ $t("labels.twitter") }}</span>
            <a
              class="value basic-link"
              :href="'//' + getSocialLink('twitter')"
              target="_blank"
              >{{ getSocialLink("twitter") }}
            </a>
          </div>

          <div class="item">
            <span class="key">{{ $t("labels.telegram") }}</span>
            <a
              class="value basic-link"
              :href="'//' + getSocialLink('telegram')"
              target="_blank"
              >{{ getSocialLink("telegram") }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    organisation: {
      type: Object,
      required: true,
    },
    adminOrg: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    logo() {
      return (
        this.organisation.logo?.image_url || this.$placeholderImage("150x150")
      );
    },
  },

  methods: {
    getSocialLink(network) {
      if (!this.organisation.social_links) {
        return null;
      }

      return this.organisation.social_links[network];
    },
  },
};
</script>

<style lang="scss" scoped>
// from app
.client-app {
  .organisation-logo-name {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    .v-responsive {
      flex: none;
    }
    .v-image {
      background-size: cover;
      background-repeat: no-repeat;
    }
    .org-name {
      font-size: 36px;
      font-weight: 700;
      padding-left: 47px;
    }
  }
  .organisation-informations {
    h2,
    h3 {
      font-size: 24px;
    }
    @media (min-width: 1024px) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 54px;
      grid-row-gap: 54px;
    }
  }
}
</style>
