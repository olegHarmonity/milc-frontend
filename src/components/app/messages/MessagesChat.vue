<template>
  <v-card class="messages-chat">
    <ChatHeader
      v-if="Object.keys(organisation).length"
      :organisation="organisation"
      style="height: 100px"
    />

    <v-divider />
    <section>
      <div v-if="messages.length" class="chat-container">
        <template v-for="(group, index) in getMessages">
          <div class="messages-wrapper" :key="index">
            <div class="messages-date">{{ getDate(group[0]) }}</div>
            <div class="mesages-boxes">
              <div
                class="component-wrapper"
                :style="{
                  'align-self': `${
                    getIsOwnMessage(message.sender.id)
                      ? 'flex-end'
                      : 'flex-start'
                  }`,
                }"
                v-for="(message, key) in group"
                :key="`component-${index}-${key}`"
              >
                <component
                  :is="getComponent(message.type)"
                  :value="getValue(message)"
                  :own="getIsOwnMessage(message.sender.id)"
                ></component>
                <TimeMessage
                  :time="message.updated_at"
                  :own="getIsOwnMessage(message.sender.id)"
                />
              </div>
            </div>
          </div>
        </template>
      </div>
      <p v-else-if="messagesRaw">{{ messagesRaw.message }}</p>
      <div
        v-if="Object.keys(organisation).length && !archived"
        class="input-wrapper"
      >
        <div class="input-box">
          <v-file-input
            class="messages-input-icon"
            :hide-input="!fileUploadValue"
            truncate-length="15"
            v-model="fileUploadValue"
          ></v-file-input>
          <v-text-field
            v-if="!fileUploadValue"
            v-model="messageInputText"
            class="messages-input"
            label="Enter message..."
            @keydown.enter="addMessage"
            solo
          ></v-text-field>
        </div>
        <div class="input-success">
          <v-btn
            class="message-btn"
            dark
            small
            rounded
            color="#630E17"
            :disabled="(!messageInputText || messageSent) && !fileUploadValue"
            @click="addMessage"
          >
            <v-icon color="#fff"> mdi-play </v-icon>
          </v-btn>
        </div>
      </div>
    </section>
  </v-card>
</template>

<script>
import { forEach, groupBy, orderBy } from "lodash";
import ChatHeader from "./parts/ChatHeader.vue";
import dayjs from "dayjs";
import TimeMessage from "@/components/app/messages/parts/TimeMessage";

export default {
  components: {
    TimeMessage,
    ChatHeader,
    FileMessage: () => import("./parts/FileMessage.vue"),
    TextMessage: () => import("./parts/TextMessage.vue"),
  },
  props: {
    organisation: {
      type: Object,
      required: true,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      messageInputText: "",
      messages: [],
      messagesRaw: null,
      messageSent: false,
      fileUploadValue: null,
      tempScroll: 0,
    };
  },
  computed: {
    getMessages() {
      const messageGroupArray = [];
      const groupMessages = groupBy(this.messages, (item) => {
        return this.getDate(item);
      });
      forEach(groupMessages, (group) => {
        const orderedGroup = orderBy(group, (item) => item.created_at, ["asc"]);
        messageGroupArray.push(orderedGroup);
      });
      return orderBy(messageGroupArray, (item) => item[0].created_at, ["asc"]);
    },
  },
  methods: {
    async fetchMessages(id) {
      const response = await this.$store.dispatch("messages/fetchSingle", id);
      this.messagesRaw = response;
      return response.data;
    },
    getDate(item) {
      return dayjs(item.created_at).format("DD MMMM, dddd");
    },
    getComponent(type) {
      return type === "text" ? "TextMessage" : "FileMessage";
    },
    getValue(message) {
      return message.type === "text" ? message.body : message;
    },
    scrollToBottom(delay = 50) {
      setTimeout(() => {
        const chatContainer =
          document.getElementsByClassName("chat-container")[0];
        if (!chatContainer) {
          this.scrollToBottom(delay);
        } else if (this.tempScroll < chatContainer.scrollHeight) {
          this.tempScroll = chatContainer.scrollHeight;
          chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: "smooth",
          });
          this.scrollToBottom(delay);
        }
      }, delay);
    },
    addMessage() {
      if (
        (!this.messageInputText && !this.fileUploadValue) ||
        this.messageSent
      ) {
        return;
      }
      const file = this.fileUploadValue || null;
      const data = {
        message: this.messageInputText,
      };
      if (file) {
        data.file = file;
      }
      this.messageSent = true;
      this.$store
        .dispatch("messages/send", {
          id: this.organisation.conversationId,
          data,
        })
        .then(async () => {
          this.messageInputText = "";
          this.fileUploadValue = null;
          this.messages = await this.fetchMessages(
            this.organisation.conversationId
          );
          this.scrollToBottom();
        })
        .finally(() => {
          this.messageSent = false;
        });
    },
    getIsOwnMessage(id) {
      return id === this.$store.getters["auth/user"].organisation_id;
    },
  },
  async mounted() {
    this.messages = await this.fetchMessages(this.organisation.conversationId);
    this.scrollToBottom(200);
  },
  watch: {
    async organisation(newOrg) {
      this.tempScroll = 0;
      this.messageInputText = "";
      this.fileUploadValue = null;
      this.messages = [];
      if (Object.keys(newOrg).length) {
        this.messages = await this.fetchMessages(
          this.organisation.conversationId
        );
        this.scrollToBottom(200);
      }
    },
  },
};
</script>

<style lang="scss">
.messages-chat {
  // padding: 48px;
  .chat-container {
    height: calc(100% - 60px);
    overflow: auto;
    padding-right: 5px;
  }
  > section {
    display: flex;
    flex-direction: column;
    height: calc(100% - 100px);
    justify-content: space-between;
    padding: 25px;
  }
  .messages-wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .messages-date {
    align-items: center;
    background: #630e17;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    font-size: 10px;
    height: 20px;
    margin: 25px 0;
    width: 200px;
  }
  .mesages-boxes {
    display: flex;
    flex-direction: column;
    width: 100%;
    component-wrapper {
      display: flex;
      flex-direction: column;
    }
  }
  .input-wrapper {
    display: flex;
    justify-content: space-between;
    height: 40px;
    .input-box {
      align-items: center;
      border: 1px solid rgba(198, 198, 198, 0.3);
      border-radius: 9px;
      color: #fff;
      display: flex;
      font-size: 14px;
      height: 100%;
      justify-content: space-between;
      width: calc(100% - 53px);
      .input-icon {
        transform: rotate(35deg);
      }
      > input {
        color: inherit;
        height: 100%;
        outline: 0;
        width: calc(100% - 25px);
      }

      .messages-input-icon {
        flex: 0 0 auto;
        .v-input__control {
          padding-left: 6px;
          .v-input__append-inner {
            align-items: center;
            height: 100%;
            margin: 0;
          }
        }
      }
      .messages-input-icon,
      .messages-input {
        align-items: center;
        height: 100%;
        margin: 0;
        padding: 0 6px;
        .v-input__prepend-outer {
          margin: 0 !important;
          .v-icon {
            font-size: 16px;
            transform: rotate(35deg);
          }
        }
        .v-input__control {
          height: 100%;
          .v-input__slot {
            background: transparent !important;
            font-size: 14px;
            height: 100%;
            margin-bottom: 0 !important;
            padding-left: 0;
            &:before {
              border: 0;
            }
          }
        }
      }
    }
    .input-success {
      height: 100%;
      width: 40px;
      .message-btn {
        border-radius: 9px;
        height: 100%;
        max-width: 40px;
        min-width: 40px;
        width: 100%;
      }
    }
  }
  .message-section {
    display: flex;
    flex-direction: column;
    height: calc(100% - 101px);
    justify-content: space-between;
  }
  ::placeholder {
    color: #fff;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #fff;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #fff;
  }
}
</style>
