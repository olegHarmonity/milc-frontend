<template>
  <div id="app-messages" class="page">
    <!-- Title -->
    <h1 class="page-title">{{ $t("messages.title") }}</h1>

    <!-- Main -->
    <MessagesMain />
  </div>
</template>

<script>
import MessagesMain from "@/components/app/messages/MessagesMain.vue";

export default {
  components: { MessagesMain },
};
</script>

<style></style>
