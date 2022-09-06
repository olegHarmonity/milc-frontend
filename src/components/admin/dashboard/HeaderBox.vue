<template>
  <div class="header-box">
    <v-icon size="30" class="header-box-icon" color="white">
      mdi-{{ icon }}
    </v-icon>
    <div class="header-box-number">{{ numbers }}</div>
    <div class="header-box-title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: "HeaderBox",
  props: {
    icon: {
      type: String,
      required: true,
    },
    numbers: {
      type: [Number, String],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.header-box {
  align-items: center;
  background: #212529;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
  padding: 35px 0 21px 0;
  width: 150px;
  .header-box-number {
    font-size: 24px;
    font-weight: 600;
  }
  .header-box-title {
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
