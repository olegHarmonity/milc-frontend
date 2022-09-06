<template>
  <v-card class="message-aside">
    <div class="message-wrapper" v-for="(message, key) in messages" :key="key">
      <div
        class="message"
        :class="{
          active: activeMessageId && message.id === activeMessageId,
          'not-seen': !message.isSeen,
        }"
        @click="$emit('changedActiveConversation', message)"
      >
        <v-avatar size="35">
          <v-img
            :src="message.logo"
            lazy-src="https://via.placeholder.com/170x250/555555?text=MILC%20Platform"
            :alt="message.name"
          />
        </v-avatar>
        <span class="message-value">{{ message.name }}</span>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "MessagesAside",
  data() {
    return {};
  },
  props: {
    messages: {
      type: Array,
      required: true,
    },
    activeMessageId: {
      type: Number,
    },
  },
};
</script>

<style lang="scss" scoped>
.message-aside {
  // padding: 25px;
}
.message-wrapper {
  padding: 10px;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }
}
.message {
  align-items: center;
  cursor: pointer;
  display: flex;
  min-height: 64px;
  padding: 10px;
  &.not-seen {
    position: relative;
    &:before {
      background: #630e17;
      border-radius: 50%;
      content: "";
      height: 10px;
      left: 0;
      position: absolute;
      transform: translateX(-50%);
      width: 10px;
    }
  }
  .v-avatar {
    margin-right: 20px;
  }
  &.active {
    background: #630e17;
    border-radius: 9px;
  }
  .message-value {
    display: inline-block;
    overflow-wrap: break-word;
    width: calc(100% - 55px);
  }
}
</style>
