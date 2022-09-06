<template>
  <div
    class="message text-message formatted-text"
    :class="{ 'own-message': own }"
  >
    {{ value }}
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
    own: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.text-message {
  background: #2b2e34;
  border-radius: 9px 9px 9px 0;
  font-size: 14px;
  line-height: 21px;
  max-width: 293px;
  padding: 10px 20px 10px 20px;
  &.own-message {
    background: #630e17;
    border-radius: 9px 9px 0 9px;
    text-align: left;
    padding: 10px 20px 10px 20px;
  }
}
</style>
