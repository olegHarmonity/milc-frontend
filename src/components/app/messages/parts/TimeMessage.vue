<template>
  <div class="time-message" :class="{ 'own-message': own }">
    {{ getDate }}
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "TimeMessage",
  props: {
    time: {
      type: String,
    },
    own: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getDate() {
      return dayjs(this.time).format("hh:mm A");
    },
  },
};
</script>

<style lang="scss" scoped>
.time-message {
  color: #9f9f9f;
  font-size: 10px;
  margin: 5px 0 20px 0;
  &.own-message {
    align-self: flex-end;
  }
}
</style>
