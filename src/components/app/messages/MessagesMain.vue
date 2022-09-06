<template>
  <div class="messages-main" v-if="conversations">
    <!-- Filters -->
    <div class="table-filters">
      <span>{{ $t("labels.filterBy") }}</span>

      <v-select
        :value="activeFilter"
        :items="filters"
        :placeholder="$t('labels.status')"
        clearable
        solo
        item-text="name"
        class="d-inline-block ml-5"
        style="width: 230px"
        @change="filterConversations"
      >
        <template v-slot:selection="{ item }">
          {{ item.key }}
          <!--          {{ $t(item.key) }}-->
        </template>
      </v-select>
    </div>

    <!-- Components -->
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3">
        <!-- TODO: Delete height: 650px this is just for showcase -->
        <MessagesAside
          style="height: 650px"
          :messages="getConversations"
          :active-message-id="activeConversation ? activeConversation.id : null"
          v-on:changedActiveConversation="updateActiveConversation"
        />
        <div class="text-center" v-if="totalPages > 1">
          <v-pagination v-model="page" :length="totalPages"></v-pagination>
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="8" lg="9">
        <MessagesChat
          v-if="activeConversation"
          style="height: 650px"
          :archived="activeConversation === 'archived'"
          :organisation="activeConversation"
        />
      </v-col>
    </v-row>

    <!-- notification message -->
    <v-alert
      class="messages-notification"
      type="info"
      :value="!conversations.length && showNotification"
      transition="fade-transition"
      text
    >
      You don't have any conversations yet.
    </v-alert>
  </div>
</template>

<script>
import { ceil, forEach, filter } from "lodash";
import MessagesAside from "./MessagesAside.vue";
import MessagesChat from "./MessagesChat.vue";

export default {
  components: { MessagesAside, MessagesChat },

  data: () => ({
    activeFilter: null,
    filters: [
      {
        key: "archived",
        name: "archived",
      },
      {
        key: "active",
        name: "active",
      },
    ],
    conversations: null,
    page: 1,
    conversationsInSidebar: 6,
    activeConversation: null,
    showNotification: false,
  }),
  methods: {
    async fetchConversations(archived = null) {
      let query = archived === "archived";
      const { data } = await this.$store.dispatch("messages/fetchAll", query);
      const userId = this.$store.getters["auth/user"].organisation_id;
      const conversations = [];
      forEach(data, (conversation) => {
        const filteredConv = filter(
          conversation.chat_users,
          (user) => user.id !== userId
        )[0];
        filteredConv.conversationId = conversation.conversation_id;
        filteredConv.isSeen = !!conversation.conversation.last_message.is_seen;
        conversations.push(filteredConv);
      });
      this.showNotification = !conversations.length;
      this.resetNotificationMessage();
      return conversations;
    },
    getActiveConversations(id = null) {
      const tempId =
        id !== null ? id : this.$store.getters["messages/activeConversations"];
      const org =
        tempId !== null
          ? filter(
              this.conversations,
              (item) =>
                item.id === this.$store.getters["messages/activeConversations"]
            )
          : this.conversations[0] || {};
      this.activeConversation = org;
    },
    updateActiveConversation(conversation) {
      this.activeConversation = conversation;
    },
    async filterConversations(event) {
      this.conversations = await this.fetchConversations(event);
      this.getActiveConversations();
    },
    resetNotificationMessage() {
      setTimeout(() => {
        this.showNotification = false;
      }, 5000);
    },
  },
  computed: {
    getConversations() {
      const start = (this.page - 1) * this.conversationsInSidebar;
      const end = this.page * this.conversationsInSidebar;
      return this.conversations ? this.conversations.slice(start, end) : [];
    },
    totalPages() {
      return ceil(this.conversations.length / this.conversationsInSidebar);
    },
  },
  async mounted() {
    this.conversations = await this.fetchConversations();
    this.getActiveConversations();
  },
};
</script>

<style lang="scss">
.messages-main {
  position: relative;
  .message {
    //
  }

  .message.own-message {
    //
  }
  .messages-notification {
    background: #191c21 !important;
    left: 0;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
